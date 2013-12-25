using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace EasySchedule.SecretFetcher
{
    class FoodFinder
    {
        string hostUrl = "http://fatsecret.ru";

        public Dictionary<string,string> FetchFoodCategories(string page)
        {
            var result = new Dictionary<string, string>();
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(page);
            var root = htmlDoc.DocumentNode;
            var linksDiv = root.Descendants("div").Single(n => n.GetAttributeValue("class", "") == "linkHolder");
            foreach (HtmlNode node in linksDiv.Descendants("td").Where(n => n.GetAttributeValue("class", "") == "borderBottom"))
            {
                var link = node.ChildNodes.First();
                if (!result.ContainsKey(link.InnerText))
                result.Add(link.InnerText, hostUrl+link.GetAttributeValue("href", ""));
            }
            return result;
        }

        public Dictionary<string, string> FetchProducts(string page)
        {
            var result = new Dictionary<string, string>();
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(page);
            IEnumerable<HtmlNode> linkContainers = htmlDoc.DocumentNode.Descendants("div")
                .Where(x => x.GetAttributeValue("class", "").Equals("food_links"));
            foreach (var linkContainer in linkContainers)
            {
                foreach (var node in linkContainer.ChildNodes.Where(n => n.Name == "a"))
                {
                    if (!result.ContainsKey(node.InnerText))
                        result.Add(node.InnerText, node.GetAttributeValue("href", ""));
                }
            }
            return result;
        }

    }
}
