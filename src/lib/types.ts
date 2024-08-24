export interface Product {
    metadata: {
      tags: Array<{
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      }>;
    };
    sys: {
      space: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };
      id: string;
      type: string;
      createdAt: string;
      updatedAt: string;
      environment: {
        sys: {
          id: string;
          type: string;
          linkType: string;
        };
      };
      revision: number;
      contentType: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };
      locale: string;
    };
    fields: {
      title: string;
      description: {
        nodeType: string;
        data: Record<string, unknown>;
        content: Array<{
          nodeType: string;
          data: Record<string, unknown>;
          content: Array<{
            nodeType: string;
            value: string;
            marks: Array<unknown>;
            data: Record<string, unknown>;
          }>;
        }>;
      };
      price: number;
      productImage: {
        metadata: {
          tags: Array<unknown>;
        };
        sys: {
          space: {
            sys: {
              type: string;
              linkType: string;
              id: string;
            };
          };
          id: string;
          type: string;
          createdAt: string;
          updatedAt: string;
          environment: {
            sys: {
              id: string;
              type: string;
              linkType: string;
            };
          };
          revision: number;
          locale: string;
        };
        fields: {
          title: string;
          description: string;
          file: {
            url: string;
            details: {
              size: number;
              image: {
                width: number;
                height: number;
              };
            };
            fileName: string;
            contentType: string;
          };
        };
      };
      category: {
        metadata: {
          tags: Array<unknown>;
        };
        sys: {
          space: {
            sys: {
              type: string;
              linkType: string;
              id: string;
            };
          };
          id: string;
          type: string;
          createdAt: string;
          updatedAt: string;
          environment: {
            sys: {
              id: string;
              type: string;
              linkType: string;
            };
          };
          revision: number;
          contentType: {
            sys: {
              type: string;
              linkType: string;
              id: string;
            };
          };
          locale: string;
        };
        fields: {
          name: string;
        };
      };
      subcategory: Array<{
        metadata: {
          tags: Array<{
            sys: {
              type: string;
              linkType: string;
              id: string;
            };
          }>;
        };
        sys: {
          space: {
            sys: {
              type: string;
              linkType: string;
              id: string;
            };
          };
          id: string;
          type: string;
          createdAt: string;
          updatedAt: string;
          environment: {
            sys: {
              id: string;
              type: string;
              linkType: string;
            };
          };
          revision: number;
          contentType: {
            sys: {
              type: string;
              linkType: string;
              id: string;
            };
          };
          locale: string;
        };
        fields: {
          name: string;
          description: {
            nodeType: string;
            data: Record<string, unknown>;
            content: Array<{
              nodeType: string;
              data: Record<string, unknown>;
              content: Array<{
                nodeType: string;
                value: string;
                marks: Array<unknown>;
                data: Record<string, unknown>;
              }>;
            }>;
          };
        };
      }>;
      instock: number;
    };
  }
