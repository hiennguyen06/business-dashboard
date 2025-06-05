"use client";

import { useState } from "react";
import { MarketingAsset, BannerContent } from "@/types";
import BannerGenerator from "@/app/components/BannerGenerator";
import PromptTemplateManager from "@/app/components/PromptTemplateManager";
import AssetLibrary from "@/app/components/AssetLibrary";

export default function MarketingToolkitPage() {
  const [assets, setAssets] = useState<MarketingAsset[]>([]);
  const [activeTab, setActiveTab] = useState<
    "generator" | "prompts" | "library"
  >("generator");
  const [generatedContent, setGeneratedContent] =
    useState<BannerContent | null>(null);

  const handleSaveAsset = (
    asset: Omit<MarketingAsset, "id" | "createdAt" | "updatedAt">
  ) => {
    const newAsset: MarketingAsset = {
      ...asset,
      id: `asset-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAssets((prev) => [newAsset, ...prev]);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  const handleDuplicateAsset = (asset: MarketingAsset) => {
    const duplicatedAsset: MarketingAsset = {
      ...asset,
      id: `asset-${Date.now()}`,
      name: `${asset.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAssets((prev) => [duplicatedAsset, ...prev]);
  };

  const handleGenerateContent = (content: BannerContent) => {
    setGeneratedContent(content);
    setActiveTab("generator");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketing Toolkit</h1>
        <p className="mt-2 text-gray-600">
          Create professional marketing assets with AI-powered prompts and
          customizable templates.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("generator")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "generator"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              style={
                activeTab === "generator"
                  ? {
                      borderBottomColor: "var(--primary)",
                      color: "var(--primary)",
                    }
                  : {}
              }
            >
              🎨 Banner Generator
            </button>
            <button
              onClick={() => setActiveTab("prompts")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "prompts"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              style={
                activeTab === "prompts"
                  ? {
                      borderBottomColor: "var(--primary)",
                      color: "var(--primary)",
                    }
                  : {}
              }
            >
              🤖 AI Prompts
            </button>
            <button
              onClick={() => setActiveTab("library")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "library"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              style={
                activeTab === "library"
                  ? {
                      borderBottomColor: "var(--primary)",
                      color: "var(--primary)",
                    }
                  : {}
              }
            >
              📁 Asset Library ({assets.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "generator" && (
        <div className="space-y-6">
          {generatedContent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="text-green-600">✨</div>
                <div>
                  <h3 className="font-medium text-green-900">
                    Content Generated!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your AI-generated content has been applied to the banner
                    generator below.
                  </p>
                </div>
              </div>
            </div>
          )}
          <BannerGenerator
            onSaveAsset={handleSaveAsset}
            initialContent={generatedContent}
          />
        </div>
      )}

      {activeTab === "prompts" && (
        <PromptTemplateManager onGenerateContent={handleGenerateContent} />
      )}

      {activeTab === "library" && (
        <AssetLibrary
          assets={assets}
          onDeleteAsset={handleDeleteAsset}
          onDuplicateAsset={handleDuplicateAsset}
        />
      )}

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 Quick Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {assets.length}
            </p>
            <p className="text-sm text-gray-600">Total Assets</p>
          </div>
          <div className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--primary-hover)" }}
            >
              {assets.filter((a) => a.format === "html").length}
            </p>
            <p className="text-sm text-gray-600">HTML Assets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: "#6366f1" }}>
              {assets.filter((a) => a.format === "image").length}
            </p>
            <p className="text-sm text-gray-600">Image Assets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
              {assets.filter((a) => a.type === "banner").length}
            </p>
            <p className="text-sm text-gray-600">Banners</p>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🚀 Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🎨</div>
            <h4 className="font-medium text-gray-900 mb-2">
              Visual Banner Generator
            </h4>
            <p className="text-sm text-gray-600">
              Create professional banners with customizable templates, colors,
              and layouts.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🤖</div>
            <h4 className="font-medium text-gray-900 mb-2">
              AI-Powered Prompts
            </h4>
            <p className="text-sm text-gray-600">
              Generate content using smart templates or custom prompts for
              instant inspiration.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">📁</div>
            <h4 className="font-medium text-gray-900 mb-2">Asset Management</h4>
            <p className="text-sm text-gray-600">
              Save, organize, and download your marketing assets in HTML or
              image formats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
