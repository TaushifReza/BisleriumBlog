using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace BisleriumBlog.API
{
    public class AddFormDataOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var requestBody = operation.RequestBody;

            // If the request body is already present, no need to add form data
            if (requestBody != null)
                return;

            // Add form data to the request body
            requestBody = new OpenApiRequestBody
            {
                Content = new Dictionary<string, OpenApiMediaType>
                {
                    ["multipart/form-data"] = new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Required = new HashSet<string>(),
                            Properties = new Dictionary<string, OpenApiSchema>(),
                        }
                    }
                }
            };

            operation.RequestBody = requestBody;
        }
    }
}
