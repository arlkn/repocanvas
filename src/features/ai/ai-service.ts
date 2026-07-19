import type { AIRequest, AIResponse } from "@/types";

export type AIProvider = "openai" | "anthropic" | "local";

interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
}

const DEFAULT_CONFIG: AIConfig = {
  provider: "local",
  model: "gpt-3.5-turbo",
};

let currentConfig: AIConfig = { ...DEFAULT_CONFIG };

export function configureAI(config: Partial<AIConfig>) {
  currentConfig = { ...currentConfig, ...config };
}

export function getAIConfig(): AIConfig {
  return { ...currentConfig };
}

const SYSTEM_PROMPT = `You are a helpful AI assistant that helps developers write great GitHub README content.
Always respond with clean, well-formatted content.
Use Markdown formatting where appropriate.
Keep responses concise but informative.
Do not include unnecessary explanations - just provide the content requested.`;

const PROMPT_TEMPLATES: Record<AIRequest["type"], string> = {
  description: `Write a compelling project description for a project called "{context}". The project is: {prompt}. Make it engaging and professional. 2-3 sentences.`,
  bio: `Write a professional developer bio for a GitHub profile. Context: {context}. Additional info: {prompt}. Keep it under 100 words, engaging and personal.`,
  installation: `Write clear installation instructions for a project. Project: {context}. Details: {prompt}. Use standard Markdown with code blocks.`,
  features: `Generate a feature list for a project. Project: {context}. Details: {prompt}. Use Markdown bullet points with brief descriptions.`,
  contribution: `Write a contribution guide section for a project. Project: {context}. Details: {prompt}. Include guidelines for issues, PRs, and development setup.`,
  documentation: `Improve or generate documentation content for: {context}. Current content: {prompt}. Make it clearer and more comprehensive.`,
};

function buildPrompt(request: AIRequest): string {
  const template = PROMPT_TEMPLATES[request.type];
  return template
    .replace("{context}", request.context)
    .replace("{prompt}", request.prompt);
}

export async function generateWithAI(request: AIRequest): Promise<AIResponse> {
  const prompt = buildPrompt(request);

  if (currentConfig.provider === "local") {
    return generateLocalResponse(request);
  }

  if (currentConfig.provider === "openai") {
    return generateOpenAIResponse(prompt);
  }

  return generateLocalResponse(request);
}

async function generateOpenAIResponse(prompt: string): Promise<AIResponse> {
  if (!currentConfig.apiKey) {
    return { content: "", error: "OpenAI API key not configured" };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: currentConfig.model || "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      return { content: "", error: "Failed to generate content" };
    }

    const data = await response.json();
    return { content: data.choices[0]?.message?.content || "" };
  } catch {
    return { content: "", error: "Network error" };
  }
}

function generateLocalResponse(request: AIRequest): Promise<AIResponse> {
  const templates: Record<AIRequest["type"], string> = {
    description: `# ${request.context}\n\nA modern, well-crafted application built with cutting-edge technology. Designed with performance and user experience in mind, this project showcases best practices in software development.`,
    bio: `Passionate developer focused on building exceptional software. I love working with modern technologies and contributing to the open source community. Always eager to learn and share knowledge.`,
    installation: `## Installation\n\n\`\`\`bash\n# Clone the repository\ngit clone https://github.com/user/${request.context.toLowerCase().replace(/\s+/g, "-")}.git\n\n# Navigate to the project directory\ncd ${request.context.toLowerCase().replace(/\s+/g, "-")}\n\n# Install dependencies\nnpm install\n\n# Start the development server\nnpm run dev\n\`\`\`\n\nThe application will be available at \`http://localhost:3000\`.`,
    features: `## Features\n\n- **Modern Architecture** - Built with the latest technologies and best practices\n- **Performance Optimized** - Fast loading times and smooth interactions\n- **Developer Experience** - Clean code, great documentation, and easy setup\n- **Responsive Design** - Works beautifully on all screen sizes\n- **Type Safe** - Full TypeScript support for better code quality`,
    contribution: `## Contributing\n\nContributions are welcome! Here's how you can help:\n\n1. Fork the repository\n2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)\n3. Commit your changes (\`git commit -m 'Add amazing feature'\`)\n4. Push to the branch (\`git push origin feature/amazing-feature\`)\n5. Open a Pull Request\n\nPlease make sure to update tests as appropriate.`,
    documentation: `## Documentation\n\nComprehensive documentation is available in the \`docs\` directory.\n\n### Quick Start\n\nFollow the installation guide above to get started.\n\n### API Reference\n\nDetailed API documentation coming soon.\n\n### Examples\n\nCheck out the \`examples\` directory for usage examples.`,
  };

  return Promise.resolve({ content: templates[request.type] });
}
