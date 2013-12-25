using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using HtmlAgilityPack;

namespace EasySchedule.SecretFetcher
{
    class WebPage
    {
        public static string GetPage(string url)
        {
            string result = "";
            WebRequest request = WebRequest.Create(url);
            request.Method = "GET";
            XmlDocument page = new XmlDocument();
            using (var response = request.GetResponse())
            {
                using (var stream = new StreamReader(response.GetResponseStream()))
                {
                    result = stream.ReadToEnd().Trim();
                }
            }
            return result;
        }
    }
}
