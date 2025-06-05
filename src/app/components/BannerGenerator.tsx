"use client";

import { useState, useEffect } from "react";
import { BannerTemplate, BannerContent, MarketingAsset } from "@/types";
import BannerPreview from "./BannerPreview";
import { useToast } from "./ToastContainer";

interface BannerGeneratorProps {
  onSaveAsset: (
    asset: Omit<MarketingAsset, "id" | "createdAt" | "updatedAt">
  ) => void;
  initialContent?: BannerContent | null;
}

const defaultTemplates: BannerTemplate[] = [
  {
    id: "hero-large",
    name: "Hero Banner",
    type: "promotional",
    dimensions: { width: 800, height: 400 },
    layout: "hero",
    colorScheme: "blue",
  },
  {
    id: "sidebar-medium",
    name: "Sidebar Banner",
    type: "product",
    dimensions: { width: 300, height: 250 },
    layout: "sidebar",
    colorScheme: "green",
  },
  {
    id: "header-wide",
    name: "Header Banner",
    type: "announcement",
    dimensions: { width: 728, height: 90 },
    layout: "header",
    colorScheme: "purple",
  },
  {
    id: "square-social",
    name: "Social Media Square",
    type: "discount",
    dimensions: { width: 400, height: 400 },
    layout: "square",
    colorScheme: "orange",
  },
];

const colorSchemes = {
  blue: { bg: "#3B82F6", text: "#FFFFFF", accent: "#1D4ED8" },
  green: { bg: "#10B981", text: "#FFFFFF", accent: "#059669" },
  red: { bg: "#EF4444", text: "#FFFFFF", accent: "#DC2626" },
  purple: { bg: "#8B5CF6", text: "#FFFFFF", accent: "#7C3AED" },
  orange: { bg: "#F97316", text: "#FFFFFF", accent: "#EA580C" },
  custom: { bg: "#6B7280", text: "#FFFFFF", accent: "#374151" },
};

export default function BannerGenerator({
  onSaveAsset,
  initialContent,
}: BannerGeneratorProps) {
  const { showSuccess } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<BannerTemplate>(
    defaultTemplates[0]
  );
  const [content, setContent] = useState<BannerContent>({
    headline: "Special Offer",
    subheadline: "Limited Time Only",
    description: "Get amazing deals on office supplies",
    callToAction: "Shop now and save big!",
    buttonText: "Shop Now",
    backgroundColor: colorSchemes.blue.bg,
    textColor: colorSchemes.blue.text,
    accentColor: colorSchemes.blue.accent,
  });
  const [assetName, setAssetName] = useState("");
  const [format, setFormat] = useState<"html" | "image">("html");

  // Apply initial content when provided
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleTemplateChange = (template: BannerTemplate) => {
    setSelectedTemplate(template);
    const scheme = colorSchemes[template.colorScheme];
    setContent((prev) => ({
      ...prev,
      backgroundColor: scheme.bg,
      textColor: scheme.text,
      accentColor: scheme.accent,
    }));
  };

  const handleContentChange = (field: keyof BannerContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleDiscountChange = (field: string, value: string | number) => {
    setContent((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        percentage: prev.discount?.percentage || 10,
        code: prev.discount?.code || "SAVE10",
        validUntil: prev.discount?.validUntil || "2024-12-31",
        [field]: value,
      },
    }));
  };

  const generateHTML = () => {
    const styles = `
      <style>
        .banner-container {
          width: ${selectedTemplate.dimensions.width}px;
          height: ${selectedTemplate.dimensions.height}px;
          background-color: ${content.backgroundColor};
          color: ${content.textColor};
          font-family: Arial, sans-serif;
          display: flex;
          ${
            selectedTemplate.layout === "hero"
              ? "flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px 20px;"
              : ""
          }
          ${
            selectedTemplate.layout === "sidebar"
              ? "flex-direction: row; align-items: center; padding: 20px;"
              : ""
          }
          ${
            selectedTemplate.layout === "header"
              ? "flex-direction: row; justify-content: space-between; align-items: center; padding: 15px 30px;"
              : ""
          }
          ${
            selectedTemplate.layout === "square"
              ? "flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 20px;"
              : ""
          }
        }
        .banner-button {
          background-color: ${content.accentColor};
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          margin-top: 16px;
        }
        .discount-badge {
          background-color: ${content.accentColor};
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 20px;
        }
      </style>
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${content.headline}</title>
        ${styles}
      </head>
      <body>
        <div class="banner-container">
          <h1 style="font-size: 32px; font-weight: bold; margin: 0 0 12px 0;">${
            content.headline
          }</h1>
          ${
            content.subheadline
              ? `<h2 style="font-size: 20px; margin: 0 0 16px 0; opacity: 0.9;">${content.subheadline}</h2>`
              : ""
          }
          ${
            content.description
              ? `<p style="font-size: 16px; margin: 0 0 20px 0;">${content.description}</p>`
              : ""
          }
          ${
            content.discount
              ? `<div class="discount-badge">${content.discount.percentage}% OFF - Code: ${content.discount.code}</div>`
              : ""
          }
          <button class="banner-button">${content.buttonText}</button>
        </div>
      </body>
      </html>
    `;

    return htmlContent;
  };

  const downloadHTML = () => {
    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${assetName || "banner"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccess("HTML banner downloaded successfully!");
  };

  const downloadImage = () => {
    // For demo purposes, we'll create a simple canvas-based image
    const canvas = document.createElement("canvas");
    canvas.width = selectedTemplate.dimensions.width;
    canvas.height = selectedTemplate.dimensions.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Background
      ctx.fillStyle = content.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text
      ctx.fillStyle = content.textColor;
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.fillText(content.headline, canvas.width / 2, canvas.height / 2 - 20);

      if (content.subheadline) {
        ctx.font = "20px Arial";
        ctx.fillText(
          content.subheadline,
          canvas.width / 2,
          canvas.height / 2 + 20
        );
      }

      // Button
      const buttonY = canvas.height / 2 + 60;
      ctx.fillStyle = content.accentColor;
      ctx.fillRect(canvas.width / 2 - 60, buttonY, 120, 40);

      ctx.fillStyle = "#ffffff";
      ctx.font = "16px Arial";
      ctx.fillText(content.buttonText, canvas.width / 2, buttonY + 25);

      // Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${assetName || "banner"}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showSuccess("Image banner downloaded successfully!");
        }
      });
    }
  };

  const saveAsset = () => {
    if (!assetName.trim()) {
      alert("Please enter an asset name");
      return;
    }

    const asset: Omit<MarketingAsset, "id" | "createdAt" | "updatedAt"> = {
      name: assetName,
      type: "banner",
      format,
      template: selectedTemplate,
      content,
    };

    onSaveAsset(asset);
    showSuccess(`Asset "${assetName}" saved successfully!`);
    setAssetName("");
  };

  return (
    <div className="space-y-6">
      {/* Asset Name and Format */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Asset Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset Name
            </label>
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter asset name..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "html" | "image")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="html">HTML</option>
              <option value="image">Image (PNG)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Choose Template
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {defaultTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateChange(template)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedTemplate.id === template.id
                  ? "border-gray-200 hover:border-gray-300"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={
                selectedTemplate.id === template.id
                  ? {
                      borderColor: "var(--primary-border)",
                      backgroundColor: "var(--primary-light)",
                    }
                  : {}
              }
            >
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {template.dimensions.width} × {template.dimensions.height}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                {template.layout}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Editor */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headline
              </label>
              <input
                type="text"
                value={content.headline}
                onChange={(e) =>
                  handleContentChange("headline", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subheadline
              </label>
              <input
                type="text"
                value={content.subheadline || ""}
                onChange={(e) =>
                  handleContentChange("subheadline", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={content.description || ""}
                onChange={(e) =>
                  handleContentChange("description", e.target.value)
                }
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) =>
                  handleContentChange("buttonText", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Discount Section */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">
                Discount (Optional)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage
                  </label>
                  <input
                    type="number"
                    value={content.discount?.percentage || ""}
                    onChange={(e) =>
                      handleDiscountChange(
                        "percentage",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    value={content.discount?.code || ""}
                    onChange={(e) =>
                      handleDiscountChange("code", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SAVE10"
                  />
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background
                  </label>
                  <input
                    type="color"
                    value={content.backgroundColor}
                    onChange={(e) =>
                      handleContentChange("backgroundColor", e.target.value)
                    }
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text
                  </label>
                  <input
                    type="color"
                    value={content.textColor}
                    onChange={(e) =>
                      handleContentChange("textColor", e.target.value)
                    }
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Accent
                  </label>
                  <input
                    type="color"
                    value={content.accentColor}
                    onChange={(e) =>
                      handleContentChange("accentColor", e.target.value)
                    }
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="flex justify-center">
            <BannerPreview
              template={selectedTemplate}
              content={content}
              className="transform scale-75 origin-top"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={saveAsset}
            className="btn-primary font-medium py-2 px-4 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
            }}
          >
            Save Asset
          </button>
          <button
            onClick={format === "html" ? downloadHTML : downloadImage}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Download {format === "html" ? "HTML" : "Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
