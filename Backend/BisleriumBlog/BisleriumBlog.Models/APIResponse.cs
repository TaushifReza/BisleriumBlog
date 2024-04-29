﻿using System.Net;

namespace BisleriumBlog.Models
{
    public class APIResponse
    {
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.InternalServerError;
        public bool IsSuccess { get; set; } = false;
        public List<string> ErrorMessage { get; set; }
        public object Result { get; set; }
    }
}
