"use client";

import { useState } from "react";
import { MarketingAsset } from "@/types";
import BannerPreview from "./BannerPreview";
import { useToast } from "./ToastContainer";

interface AssetLibraryProps {
  assets: MarketingAsset[];
  onDeleteAsset: (id: string) => void;
  onDuplicateAsset: (asset: MarketingAsset) => void;
}

export default function AssetLibrary({
  assets,
  onDeleteAsset,
  onDuplicateAsset,
}: AssetLibraryProps) {
  const { showSuccess } = useToast();
  const [filter, setFilter] = useState<
    "all" | "banner" | "social" | "email" | "flyer"
  >("all");
  const [formatFilter, setFormatFilter] = useState<"all" | "html" | "image">(
    "all"
  );

  const filteredAssets = assets.filter((asset) => {
    const typeMatch = filter === "all" || asset.type === filter;
    const formatMatch = formatFilter === "all" || asset.format === formatFilter;
    return typeMatch && formatMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const downloadAsset = (asset: MarketingAsset) => {
    if (asset.format === "html") {
      const styles = `
        <style>
          .banner-container {
            width: ${asset.template.dimensions.width}px;
            height: ${asset.template.dimensions.height}px;
            background-color: ${asset.content.backgroundColor};
            color: ${asset.content.textColor};
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px 20px;
          }
          .banner-button {
            background-color: ${asset.content.accentColor};
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
        </style>
      `;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${asset.content.headline}</title>
          ${styles}
        </head>
        <body>
          <div class="banner-container">
            <h1 style="font-size: 32px; font-weight: bold; margin: 0 0 12px 0;">${
              asset.content.headline
            }</h1>
            ${
              asset.content.subheadline
                ? `<h2 style="font-size: 20px; margin: 0 0 16px 0; opacity: 0.9;">${asset.content.subheadline}</h2>`
                : ""
            }
            ${
              asset.content.description
                ? `<p style="font-size: 16px; margin: 0 0 20px 0;">${asset.content.description}</p>`
                : ""
            }
            <button class="banner-button">${asset.content.buttonText}</button>
          </div>
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${asset.name}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccess("HTML asset downloaded!");
    } else {
      // Generate image download
      const canvas = document.createElement("canvas");
      canvas.width = asset.template.dimensions.width;
      canvas.height = asset.template.dimensions.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Background
        ctx.fillStyle = asset.content.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text
        ctx.fillStyle = asset.content.textColor;
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          asset.content.headline,
          canvas.width / 2,
          canvas.height / 2 - 20
        );

        if (asset.content.subheadline) {
          ctx.font = "20px Arial";
          ctx.fillText(
            asset.content.subheadline,
            canvas.width / 2,
            canvas.height / 2 + 20
          );
        }

        // Button
        const buttonY = canvas.height / 2 + 60;
        ctx.fillStyle = asset.content.accentColor;
        ctx.fillRect(canvas.width / 2 - 60, buttonY, 120, 40);

        ctx.fillStyle = "#ffffff";
        ctx.font = "16px Arial";
        ctx.fillText(asset.content.buttonText, canvas.width / 2, buttonY + 25);

        // Download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${asset.name}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showSuccess("Image asset downloaded!");
          }
        });
      }
    }
  };

  const handleDuplicate = (asset: MarketingAsset) => {
    onDuplicateAsset(asset);
    showSuccess(`Asset "${asset.name}" duplicated!`);
  };

  const handleDelete = (asset: MarketingAsset) => {
    if (confirm(`Are you sure you want to delete "${asset.name}"?`)) {
      onDeleteAsset(asset.id);
      showSuccess(`Asset "${asset.name}" deleted!`);
    }
  };

  if (assets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Assets Yet
          </h3>
          <p className="text-gray-600">
            Create your first marketing asset using the banner generator above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset Type
            </label>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as
                    | "all"
                    | "banner"
                    | "social"
                    | "email"
                    | "flyer"
                )
              }
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="banner">Banner</option>
              <option value="social">Social Media</option>
              <option value="email">Email</option>
              <option value="flyer">Flyer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select
              value={formatFilter}
              onChange={(e) =>
                setFormatFilter(e.target.value as "all" | "html" | "image")
              }
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Formats</option>
              <option value="html">HTML</option>
              <option value="image">Image</option>
            </select>
          </div>
          <div className="ml-auto">
            <p className="text-sm text-gray-600">
              {filteredAssets.length} of {assets.length} assets
            </p>
          </div>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Preview */}
            <div className="p-4 bg-gray-50 flex justify-center">
              <BannerPreview
                template={asset.template}
                content={asset.content}
                className="transform scale-50 origin-center"
              />
            </div>

            {/* Asset Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{asset.name}</h3>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="capitalize">{asset.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="uppercase">{asset.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>
                    {asset.template.dimensions.width} ×{" "}
                    {asset.template.dimensions.height}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatDate(asset.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadAsset(asset)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDuplicate(asset)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded transition-colors"
                  title="Duplicate"
                >
                  📋
                </button>
                <button
                  onClick={() => handleDelete(asset)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium py-2 px-3 rounded transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
