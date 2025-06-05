"use client";

import { useState } from "react";
import { PromptTemplate, BannerContent } from "@/types";
import { useToast } from "./ToastContainer";

interface PromptTemplateManagerProps {
  onGenerateContent: (content: BannerContent) => void;
}

const defaultPrompts: PromptTemplate[] = [
  {
    id: "seasonal-sale",
    name: "Seasonal Sale",
    category: "seasonal",
    prompt:
      "Create a {season} sale banner for {product_category} with {discount}% off. Make it {tone} and include a call to action.",
    variables: ["season", "product_category", "discount", "tone"],
    example: {
      headline: "Spring Sale",
      subheadline: "Fresh Deals on Office Supplies",
      description: "Refresh your workspace with our spring collection",
      callToAction: "Shop the spring sale now!",
      buttonText: "Shop Now",
      backgroundColor: "#10B981",
      textColor: "#FFFFFF",
      accentColor: "#059669",
      discount: {
        percentage: 25,
        code: "SPRING25",
        validUntil: "2024-06-21",
      },
    },
  },
  {
    id: "product-launch",
    name: "Product Launch",
    category: "product",
    prompt:
      "Create a banner announcing the launch of {product_name}. Highlight {key_feature} and make it {tone}.",
    variables: ["product_name", "key_feature", "tone"],
    example: {
      headline: "Introducing Smart Organizer Pro",
      subheadline: "Revolutionary Desk Organization",
      description: "The future of workspace efficiency is here",
      callToAction: "Be the first to experience it!",
      buttonText: "Pre-Order Now",
      backgroundColor: "#8B5CF6",
      textColor: "#FFFFFF",
      accentColor: "#7C3AED",
    },
  },
  {
    id: "discount-offer",
    name: "Discount Offer",
    category: "discount",
    prompt:
      "Create a {urgency} discount banner offering {discount}% off {product_category}. Use {color_scheme} colors and make it {tone}.",
    variables: [
      "urgency",
      "discount",
      "product_category",
      "color_scheme",
      "tone",
    ],
    example: {
      headline: "Flash Sale Alert!",
      subheadline: "Limited Time Only",
      description: "Don't miss out on these incredible savings",
      callToAction: "Hurry, sale ends soon!",
      buttonText: "Shop Sale",
      backgroundColor: "#EF4444",
      textColor: "#FFFFFF",
      accentColor: "#DC2626",
      discount: {
        percentage: 40,
        code: "FLASH40",
        validUntil: "2024-12-31",
      },
    },
  },
  {
    id: "promotional",
    name: "General Promotion",
    category: "promotional",
    prompt:
      "Create a promotional banner for {business_name} featuring {main_message}. Make it {tone} and include {call_to_action}.",
    variables: ["business_name", "main_message", "tone", "call_to_action"],
    example: {
      headline: "Your Business Success Starts Here",
      subheadline: "Premium Office Solutions",
      description: "Everything you need to run your business efficiently",
      callToAction: "Start your journey to success!",
      buttonText: "Get Started",
      backgroundColor: "#3B82F6",
      textColor: "#FFFFFF",
      accentColor: "#1D4ED8",
    },
  },
];

export default function PromptTemplateManager({
  onGenerateContent,
}: PromptTemplateManagerProps) {
  const { showSuccess } = useToast();
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate>(
    defaultPrompts[0]
  );
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [customPrompt, setCustomPrompt] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handleVariableChange = (variable: string, value: string) => {
    setVariables((prev) => ({ ...prev, [variable]: value }));
  };

  const generateFromTemplate = () => {
    // Simple template processing - replace variables in the example
    const generatedContent = { ...selectedPrompt.example };

    // Replace variables in text fields
    Object.entries(variables).forEach(([key, value]) => {
      if (value.trim()) {
        const placeholder = `{${key}}`;
        generatedContent.headline = generatedContent.headline.replace(
          new RegExp(placeholder, "gi"),
          value
        );
        generatedContent.subheadline =
          generatedContent.subheadline?.replace(
            new RegExp(placeholder, "gi"),
            value
          ) || "";
        generatedContent.description =
          generatedContent.description?.replace(
            new RegExp(placeholder, "gi"),
            value
          ) || "";
        generatedContent.callToAction = generatedContent.callToAction.replace(
          new RegExp(placeholder, "gi"),
          value
        );
        generatedContent.buttonText = generatedContent.buttonText.replace(
          new RegExp(placeholder, "gi"),
          value
        );
      }
    });

    // Apply some smart defaults based on variables
    if (variables.discount) {
      const discountValue = parseInt(variables.discount);
      if (!isNaN(discountValue)) {
        generatedContent.discount = {
          percentage: discountValue,
          code: `SAVE${discountValue}`,
          validUntil: "2024-12-31",
        };
      }
    }

    if (variables.color_scheme) {
      const colorSchemes: Record<
        string,
        { bg: string; text: string; accent: string }
      > = {
        blue: { bg: "#3B82F6", text: "#FFFFFF", accent: "#1D4ED8" },
        green: { bg: "#10B981", text: "#FFFFFF", accent: "#059669" },
        red: { bg: "#EF4444", text: "#FFFFFF", accent: "#DC2626" },
        purple: { bg: "#8B5CF6", text: "#FFFFFF", accent: "#7C3AED" },
        orange: { bg: "#F97316", text: "#FFFFFF", accent: "#EA580C" },
      };

      const scheme = colorSchemes[variables.color_scheme.toLowerCase()];
      if (scheme) {
        generatedContent.backgroundColor = scheme.bg;
        generatedContent.textColor = scheme.text;
        generatedContent.accentColor = scheme.accent;
      }
    }

    onGenerateContent(generatedContent);
    showSuccess("Content generated from template!");
  };

  const generateFromCustomPrompt = () => {
    if (!customPrompt.trim()) {
      alert("Please enter a custom prompt");
      return;
    }

    // Simple AI-like content generation based on prompt keywords
    const prompt = customPrompt.toLowerCase();
    const generatedContent: BannerContent = {
      headline: "Special Offer",
      callToAction: "Take action now!",
      buttonText: "Get Started",
      backgroundColor: "#3B82F6",
      textColor: "#FFFFFF",
      accentColor: "#1D4ED8",
    };

    // Analyze prompt for keywords and generate appropriate content
    if (prompt.includes("sale") || prompt.includes("discount")) {
      generatedContent.headline = "Amazing Sale Event";
      generatedContent.subheadline = "Limited Time Offer";
      generatedContent.description = "Don't miss out on these incredible deals";
      generatedContent.buttonText = "Shop Sale";
      generatedContent.backgroundColor = "#EF4444";
      generatedContent.accentColor = "#DC2626";
    } else if (prompt.includes("new") || prompt.includes("launch")) {
      generatedContent.headline = "Exciting New Arrival";
      generatedContent.subheadline = "Just Launched";
      generatedContent.description = "Discover our latest innovation";
      generatedContent.buttonText = "Explore Now";
      generatedContent.backgroundColor = "#8B5CF6";
      generatedContent.accentColor = "#7C3AED";
    } else if (prompt.includes("business") || prompt.includes("professional")) {
      generatedContent.headline = "Professional Solutions";
      generatedContent.subheadline = "For Your Business";
      generatedContent.description = "Elevate your business to the next level";
      generatedContent.buttonText = "Learn More";
    }

    // Extract discount percentage if mentioned
    const discountMatch = prompt.match(/(\d+)%/);
    if (discountMatch) {
      const percentage = parseInt(discountMatch[1]);
      generatedContent.discount = {
        percentage,
        code: `SAVE${percentage}`,
        validUntil: "2024-12-31",
      };
    }

    onGenerateContent(generatedContent);
    showSuccess("Content generated from custom prompt!");
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setIsCustomMode(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !isCustomMode
                ? "text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={
              !isCustomMode
                ? {
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                  }
                : {}
            }
          >
            Template Mode
          </button>
          <button
            onClick={() => setIsCustomMode(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isCustomMode
                ? "text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={
              isCustomMode
                ? {
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                  }
                : {}
            }
          >
            Custom Prompt
          </button>
        </div>
      </div>

      {!isCustomMode ? (
        <>
          {/* Template Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Choose Prompt Template
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedPrompt.id === prompt.id
                      ? "border-gray-200 hover:border-gray-300"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={
                    selectedPrompt.id === prompt.id
                      ? {
                          borderColor: "var(--primary-border)",
                          backgroundColor: "var(--primary-light)",
                        }
                      : {}
                  }
                >
                  <h4 className="font-medium text-gray-900">{prompt.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {prompt.category}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {prompt.prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Variable Inputs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Fill in Variables
            </h3>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 font-medium mb-2">
                Template:
              </p>
              <p className="text-sm text-gray-600">{selectedPrompt.prompt}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPrompt.variables.map((variable) => (
                <div key={variable}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {variable.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    value={variables[variable] || ""}
                    onChange={(e) =>
                      handleVariableChange(variable, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${variable.replace(/_/g, " ")}...`}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={generateFromTemplate}
              className="mt-6 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
              }}
            >
              Generate from Template
            </button>
          </div>
        </>
      ) : (
        /* Custom Prompt Mode */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Custom Prompt
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your banner
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Example: Create a summer sale banner for office supplies with 30% off. Make it bright and energetic with a red color scheme."
            />
          </div>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              💡 Tips for better results:
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Mention specific colors (red, blue, green, etc.)</li>
              <li>• Include discount percentages if applicable</li>
              <li>
                • Specify the tone (professional, energetic, urgent, etc.)
              </li>
              <li>• Mention the target audience or product category</li>
            </ul>
          </div>
          <button
            onClick={generateFromCustomPrompt}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Generate from Prompt
          </button>
        </div>
      )}
    </div>
  );
}
