using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasySchedule.SecretFetcher.Secret;
using HtmlAgilityPack;

namespace EasySchedule.SecretFetcher
{
    class FoodFinder
    {
        public string HostUrl { get; set; }
        public List<Category> Categories { get; set; }
        public List<ProductLink> Products { get; set; }

        public FoodFinder()
        {
        }

        public IEnumerable<Category> FetchFoodCategories()
        {
            var url =
                  "http://fatsecret.ru/%D0%BA%D0%B0%D0%BB%D0%BE%D1%80%D0%B8%D0%B8-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D0%B5/%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0/%D0%91%D0%BE%D0%B1%D1%8B-%D0%B8-%D0%91%D0%BE%D0%B1%D0%BE%D0%B2%D1%8B%D0%B5";
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(WebPage.GetPage(url));
            var root = htmlDoc.DocumentNode;
            var linksDiv = root.Descendants("div").Single(n => n.GetAttributeValue("class", "") == "linkHolder");
            foreach (HtmlNode node in linksDiv.Descendants("td").Where(n => n.GetAttributeValue("class", "") == "borderBottom"))
            {
                var link = node.ChildNodes.First();
                if (!Categories.Select(c => c.Name).Contains(link.InnerText))
                {
                    Categories.Add(new Category
                                       {
                                           Link = HostUrl + link.GetAttributeValue("href", ""),
                                           Name = link.InnerText
                                       });
                }
            }
            return Categories;
        }

        public IEnumerable<ProductLink> FetchCategoryProducts(Category category)
        {
            var list = new List<ProductLink>();
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(WebPage.GetPage(category.Link));
            IEnumerable<HtmlNode> linkContainers = htmlDoc.DocumentNode.Descendants("div")
                .Where(x => x.GetAttributeValue("class", "").Equals("food_links"));
            foreach (var linkContainer in linkContainers)
            {
                foreach (var node in linkContainer.ChildNodes.Where(n => n.Name == "a")
                    .Where(node => !Products.Select(p => p.Name).Contains(node.InnerText)))
                {
                    list.Add(new ProductLink
                                     {
                                         Category = category,
                                         Link = node.GetAttributeValue("href", ""),
                                         Name = node.InnerText
                                     });
                }
            }
            category.ProductLinks = list;
            Products.AddRange(list);
            return list;
        }

        public IEnumerable<Category> FetchBrands(int categroyTypeId)
        {
            var list = new List<Category>();
            var url = "http://fatsecret.ru/Default.aspx?pa=brands&t=1";
            switch (categroyTypeId)
            {
                case 2:
                    url = "http://fatsecret.ru/Default.aspx?pa=brands&t=1";
                    Console.WriteLine("Start fetching brands...");
                    break;
                case 3:
                    url = "http://fatsecret.ru/Default.aspx?pa=brands&t=2";
                    Console.WriteLine("Start fetching restaraunts...");
                    break;
                case 4:
                    url = "http://fatsecret.ru/Default.aspx?pa=brands&t=3";
                    Console.WriteLine("Start fetching supermarkets...");
                    break;
            }
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(WebPage.GetPage(url));
            var root = htmlDoc.DocumentNode;
            var lettersContainer = root.Descendants("div")
                .Last(n => n.GetAttributeValue("style", "") == "font-weight:bold");
            var lettersLinks = lettersContainer.ChildNodes.Where(n => n.Name == "a");
            foreach (var letterLink in lettersLinks)
            {
                var letterHtmlDoc = new HtmlDocument();
                Console.WriteLine("Start fetching by letter {0}", letterLink.InnerText);
                letterHtmlDoc.LoadHtml(WebPage.GetPage(HostUrl + letterLink.GetAttributeValue("href", "")));
                var numbersContainer = letterHtmlDoc.DocumentNode.Descendants("div")
                    .FirstOrDefault(n => n.GetAttributeValue("class", "") == "searchResultsPaging");
                var numbersLinks = new List<HtmlNode>();
                if (numbersContainer != null)
                {
                    numbersLinks = numbersContainer.Descendants("a").ToList();
                }

                if (numbersLinks.Any())
                {
                    var numberHtmlDoc = new HtmlDocument();
                    int pageCounter = 0;
                    var pageUrl = HostUrl + numbersLinks.First().GetAttributeValue("href", "");


                    while (numbersLinks.Last().InnerText == "Конец" || pageCounter != int.Parse(numbersLinks.Last().InnerText))
                    {
                        Console.WriteLine("Start fetching from page {0}", pageCounter);
                        numberHtmlDoc.LoadHtml(WebPage.GetPage(pageUrl));
                        pageCounter++;
                        pageUrl = pageUrl.Replace("pg=" + (pageCounter - 1), "pg=" + pageCounter);
                        numbersContainer = numberHtmlDoc.DocumentNode.Descendants("div")
                            .FirstOrDefault(n => n.GetAttributeValue("class", "") == "searchResultsPaging");
                        if (numbersContainer != null)
                        {
                            numbersLinks = numbersContainer.Descendants("a").ToList();
                        }
                        var brandLinks = numberHtmlDoc.DocumentNode.Descendants("h2")
                           .Where(n => n.GetAttributeValue("style", "") == "text-transform:capitalize;margin:0")
                           .Select(n => n.FirstChild);

                        Console.WriteLine("{0} brands found", brandLinks.Count());
                        foreach (var brandLink in brandLinks)
                        {
                            if (!Categories.Select(c => c.Name).Contains(brandLink.GetAttributeValue("title", "")))
                            {
                                list.Add(new Category
                                {
                                    CategoryTypeId = categroyTypeId,
                                    Link = HostUrl + brandLink.GetAttributeValue("href", ""),
                                    Name = brandLink.GetAttributeValue("title", "")
                                });
                            }
                        }
                    }

                }
            }

            Categories.AddRange(list);
            return list;
        }

        public IEnumerable<ProductLink> FetchBrandedProductlinks(Category brand)
        {
            var list = new List<ProductLink>();
            HtmlDocument page = new HtmlDocument();
            int pageCounter = 0;
            var url = String.Format("http://fatsecret.ru/%D0%BA%D0%B0%D0%BB%D0%BE%D1%80%D0%B8%D0%B8-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D0%B5/search?q={0}&pg={1}&dt=-2147483648"
                , brand.Name, pageCounter);
            var numberLinks = new List<HtmlNode>();
            Console.WriteLine("Start fetching products for brand '{0}' ", brand.Name);
            var pageText = WebPage.GetPage(url);
            page.LoadHtml(pageText);
            var pagingBox = page.DocumentNode.Descendants("div").SingleOrDefault(
                n => n.GetAttributeValue("class", "") == "searchResultsPaging");
            if (pagingBox != null)
            {
                numberLinks = pagingBox.Descendants("a").ToList();
                while (numberLinks.Last().InnerText == "Следующая" || pageCounter != int.Parse(numberLinks.Last().InnerText))
                {
                    Console.WriteLine("fetching page {0} ", pageCounter + 1);
                    pageCounter++;
                    url = url.Replace("pg=" + (pageCounter - 1), "pg=" + pageCounter);
                    var productRows = page.DocumentNode.Descendants("table").Single(
                            n => n.GetAttributeValue("class", "") == "generic searchResult").Descendants("td");
                    foreach (var productRow in productRows)
                    {
                        list.Add(new ProductLink
                                     {
                                         CategoryId = brand.Id,
                                         Name = productRow.ChildNodes[1].InnerText,
                                         Link = productRow.ChildNodes[1].GetAttributeValue("href", ""),
                                         Info = productRow.ChildNodes.Count > 5 ? productRow.ChildNodes[5].InnerText : ""
                                     });
                    }
                    if (numberLinks.Last().InnerText == "Следующая" || pageCounter != int.Parse(numberLinks.Last().InnerText))
                    {
                        pageText = WebPage.GetPage(url);
                        page.LoadHtml(pageText);
                        numberLinks = page.DocumentNode.Descendants("div").Single(
                                n => n.GetAttributeValue("class", "") == "searchResultsPaging").Descendants("a").ToList();
                    }



                }
            }
            Products.AddRange(list);
            return list;
        }

        private int not100counter = 0;
        private int errorCounter = 0;
        public Product GetProductInfo(ProductLink link)
        {
            Product result = new Product();
            HtmlDocument document = new HtmlDocument();
            document.LoadHtml(WebPage.GetPage(HostUrl + link.Link));
            var portionValueContainer = document.DocumentNode.Descendants("td").SingleOrDefault(
                    n => n.GetAttributeValue("class", "") == "label center strong");
            if(portionValueContainer != null)
            {
                var portionValue = portionValueContainer.InnerText;

                if (portionValue != "100 г")
                {
                    var portionTable = document.DocumentNode.Descendants("table").FirstOrDefault(
                            n => n.GetAttributeValue("style", "") == "margin:0px;margin-top:5px;");

                    if (portionTable != null)
                    {
                        var defaultLink = portionTable.Descendants("a").SingleOrDefault(n => n.InnerText == "100 г");
                        if (defaultLink != null)
                        {
                            document.LoadHtml(WebPage.GetPage(HostUrl + defaultLink.GetAttributeValue("href", "")));
                        }
                        else
                        {
                            not100counter++;
                            Console.WriteLine(link.Name + ": " + portionValue);
                            return null;
                        }
                    }
                    else
                    {
                        not100counter++;
                        Console.WriteLine(link.Name + ": " + portionValue);
                        return null;
                    }
                }

                portionValueContainer = document.DocumentNode.Descendants("td").SingleOrDefault(
                    n => n.GetAttributeValue("class", "") == "label center strong");
                portionValue = portionValueContainer.InnerText.Trim();

                var energyValue = document.DocumentNode.Descendants("td")
                    .SingleOrDefault(n => n.InnerText.Trim() == "Енергетическая ценность").NextSibling.NextSibling.InnerText.Trim()
                    .Replace("\t","").Replace("\r\n", " ");
                var carbohydratesValue = document.DocumentNode.Descendants("td")
                    .SingleOrDefault(n => n.InnerText.Trim() == "Углеводы").NextSibling.NextSibling.InnerText.Trim();
                var proteinsValue = document.DocumentNode.Descendants("td")
                    .SingleOrDefault(n => n.InnerText.Trim() == "Белки").NextSibling.NextSibling.InnerText.Trim();
                var fatsValue = document.DocumentNode.Descendants("td")
                    .SingleOrDefault(n => n.InnerText.Trim() == "Жиры").NextSibling.NextSibling.InnerText.Trim();
                return new Product
                           {
                               Name = link.Name,
                               ProductLinkId = link.Id,
                               CategoryId = link.CategoryId,
                               PortionName = portionValueContainer.InnerText.Split(' ')[2].Trim(),
                               Calories = double.Parse(energyValue.Split(' ')[2], NumberStyles.Float),
                               Carbohydrates = double.Parse(carbohydratesValue.Split(' ')[0], NumberStyles.Float),
                               Proteins = double.Parse(proteinsValue.Split(' ')[0], NumberStyles.Float),
                               Fats = double.Parse(fatsValue.Split(' ')[0], NumberStyles.Float),
                               PortionSize = double.Parse(portionValue.Split(' ')[1], NumberStyles.Float)
                           };
            }
            else
            {
                errorCounter++;
                return null;
            }
        }

    }
}
