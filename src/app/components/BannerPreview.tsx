import { BannerTemplate, BannerContent } from "@/types";

interface BannerPreviewProps {
  template: BannerTemplate;
  content: BannerContent;
  className?: string;
}

export default function BannerPreview({
  template,
  content,
  className = "",
}: BannerPreviewProps) {
  const getLayoutStyles = () => {
    const baseStyles = {
      width: `${template.dimensions.width}px`,
      height: `${template.dimensions.height}px`,
      backgroundColor: content.backgroundColor,
      color: content.textColor,
    };

    switch (template.layout) {
      case "hero":
        return {
          ...baseStyles,
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center" as const,
          padding: "40px 20px",
        };
      case "sidebar":
        return {
          ...baseStyles,
          display: "flex",
          flexDirection: "row" as const,
          alignItems: "center",
          padding: "20px",
        };
      case "header":
        return {
          ...baseStyles,
          display: "flex",
          flexDirection: "row" as const,
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
        };
      case "square":
        return {
          ...baseStyles,
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center" as const,
          padding: "20px",
        };
      default:
        return baseStyles;
    }
  };

  const getButtonStyles = () => ({
    backgroundColor: content.accentColor,
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "16px",
  });

  const renderContent = () => {
    switch (template.layout) {
      case "hero":
        return (
          <>
            {content.logoUrl && (
              <img
                src={content.logoUrl}
                alt="Logo"
                style={{ maxHeight: "40px", marginBottom: "20px" }}
              />
            )}
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                margin: "0 0 12px 0",
              }}
            >
              {content.headline}
            </h1>
            {content.subheadline && (
              <h2
                style={{ fontSize: "20px", margin: "0 0 16px 0", opacity: 0.9 }}
              >
                {content.subheadline}
              </h2>
            )}
            {content.description && (
              <p
                style={{
                  fontSize: "16px",
                  margin: "0 0 20px 0",
                  maxWidth: "600px",
                }}
              >
                {content.description}
              </p>
            )}
            {content.discount && (
              <div
                style={{
                  backgroundColor: content.accentColor,
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                {content.discount.percentage}% OFF - Code:{" "}
                {content.discount.code}
              </div>
            )}
            <button style={getButtonStyles()}>{content.buttonText}</button>
          </>
        );

      case "sidebar":
        return (
          <>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0 0 8px 0",
                }}
              >
                {content.headline}
              </h3>
              {content.subheadline && (
                <p style={{ fontSize: "16px", margin: "0 0 16px 0" }}>
                  {content.subheadline}
                </p>
              )}
              <button style={getButtonStyles()}>{content.buttonText}</button>
            </div>
            {content.imageUrl && (
              <div style={{ marginLeft: "20px" }}>
                <img
                  src={content.imageUrl}
                  alt="Banner"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "100px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            )}
          </>
        );

      case "header":
        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              {content.logoUrl && (
                <img
                  src={content.logoUrl}
                  alt="Logo"
                  style={{ height: "30px", marginRight: "20px" }}
                />
              )}
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                {content.headline}
              </span>
            </div>
            <button style={getButtonStyles()}>{content.buttonText}</button>
          </>
        );

      case "square":
        return (
          <>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "0 0 12px 0",
              }}
            >
              {content.headline}
            </h3>
            {content.description && (
              <p style={{ fontSize: "14px", margin: "0 0 16px 0" }}>
                {content.description}
              </p>
            )}
            {content.discount && (
              <div
                style={{
                  backgroundColor: content.accentColor,
                  color: "#ffffff",
                  padding: "6px 12px",
                  borderRadius: "16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                {content.discount.percentage}% OFF
              </div>
            )}
            <button style={getButtonStyles()}>{content.buttonText}</button>
          </>
        );

      default:
        return (
          <div style={{ padding: "20px" }}>
            <h3>{content.headline}</h3>
            <p>{content.description}</p>
            <button style={getButtonStyles()}>{content.buttonText}</button>
          </div>
        );
    }
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      <div style={getLayoutStyles()}>{renderContent()}</div>
    </div>
  );
}
