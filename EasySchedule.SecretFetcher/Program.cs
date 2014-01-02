using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EasySchedule.SecretFetcher.Secret;

namespace EasySchedule.SecretFetcher
{
    class Program
    {
        static readonly FoodFinder foodFinder = new FoodFinder { HostUrl = "http://fatsecret.ru" };
        static DateTime start;
        static DateTime end;
        static int TwoWordsCount = 0;
        static int ThreeWordsCount = 0;
        static int FourWordsCount = 0;
        static int StrangeWordCount = 0;
        static Product ConvertLinkToProduct(ProductLink link)
        {
            Product result = new Product();
            var info = "";
            if (link.Info != null && link.Info.Length > 1)
            {
                info = link.Info.Trim();
                RegexOptions options = RegexOptions.None;
                Regex regex = new Regex(@"[ ]{2,}", options);
                info = regex.Replace(info, @" ");
                string portion = info.Split('-')[0].Trim();
                string valueInfo = info.Split('-')[1].Split('&')[0].Trim();
                string[] valiueInfoWords = valueInfo.Replace("Калории:", "").Replace("Углев:", "")
                    .Replace("Жир:", "").Replace("Белк:", "").Replace("ккал", "").Replace("г", "").Split('|');
                string[] portionWords = portion.Split(' ');
                string value = "";
                if(portionWords.Count() == 4)
                {
                    double size = double.Parse(portionWords[3].Replace("(", "").Replace(")", "")
                                                   .Replace("г", ""));
                    return new Product
                               {
                                   Name = link.Name,
                                   CategoryId = link.CategoryId,
                                   ProductLinkId = link.Id,
                                   PortionName = portionWords[2],
                                   PortionSize = size,
                                   PortionAmount = double.Parse(portionWords[1]),
                                   Calories = double.Parse(valiueInfoWords[0]),
                                   Fats = double.Parse(valiueInfoWords[1]),
                                   Carbohydrates = double.Parse(valiueInfoWords[2]),
                                   Proteins = double.Parse(valiueInfoWords[3])
                               };
                }
            }
            return null;
        }

        static void Main(string[] args)
        {
          //  TransferProducts();
            using (var context = new SecretDatabaseEntities())
            {
                int n = 0;
                foreach (var productLink in context.ProductLinks.Where(p=>!p.IsFetched).ToList().Skip(60))
                {
                    n++;
                    var product = ConvertLinkToProduct(productLink);
                    if(product != null)
                    {
                        context.Products.Add(product);
                        context.SaveChanges();
                        productLink.IsFetched = true;
                        context.SaveChanges();
                        Console.WriteLine("{0} - Product {1} was added to database",n, product.Name);
                    }
                    else
                    {
                        //productLink.IsFetched = false;
                        //context.SaveChanges();
                        Console.WriteLine("Wrong product: {0}", productLink.Name);
                    }
                }
            }
            Console.ReadKey();
        }
       
        //static void LoadDatabase()
        //{
        //    using (var context = new SecretDatabaseEntities())
        //    {
        //        foodFinder.Products = new List<ProductLink>();
        //        foodFinder.Categories = context.Categories.Include("ProductLinks").ToList();
        //        foreach (var category in foodFinder.Categories)
        //        {
        //            foreach (var product in category.ProductLinks)
        //            {
        //                product.Category = category;
        //            }
        //            foodFinder.Products.AddRange(category.ProductLinks);
        //        }
        //    }
        //}

        //static void LoadCategories()
        //{
        //    Console.Write("Fetching categories...");
        //    start = DateTime.Now;
        //    foodFinder.FetchFoodCategories();
        //    end = DateTime.Now;
        //    Console.WriteLine(" {0} ms\n", (end - start).TotalMilliseconds);
        //    Console.WriteLine("{0} categories fetched:", foodFinder.Categories.Count);
        //    foreach (var category in foodFinder.Categories)
        //    {
        //        Console.WriteLine("- {0}", category.Name);
        //    }
        //    Console.WriteLine("\n");
        //    using (var context = new SecretDatabaseEntities())
        //    {
        //        foreach (var category in foodFinder.Categories)
        //        {
        //            context.Categories.Add(new Category
        //                                       {
        //                                           CategoryTypeId = 1,
        //                                           Link = category.Link,
        //                                           Name = category.Name
        //                                       });
        //        }
        //        context.SaveChanges();
        //    }
        //}

        //static void LoadBrands()
        //{
        //    start = DateTime.Now;
        //    var brands = foodFinder.FetchBrands(2).ToList();
        //    end = DateTime.Now;
        //    Console.WriteLine(" {0} ms\n", (end - start).TotalMilliseconds);
        //    Console.WriteLine("{0} brands fetched:", brands.Count);
        //    Console.WriteLine("\n");
        //    using (var context = new SecretDatabaseEntities())
        //    {
        //        foreach (var category in brands)
        //        {
        //            context.Categories.Add(category);
        //        }
        //        context.SaveChanges();

        //        Console.WriteLine("{0} rows were written to database", brands.Count);
        //    }
        //}

        //static void LoadRestaurants()
        //{
        //    start = DateTime.Now;
        //    var brands = foodFinder.FetchBrands(3).ToList();
        //    end = DateTime.Now;
        //    Console.WriteLine(" {0} ms\n", (end - start).TotalMilliseconds);
        //    Console.WriteLine("{0} brands fetched:", brands.Count);
        //    Console.WriteLine("\n");
        //    using (var context = new SecretDatabaseEntities())
        //    {
        //        foreach (var category in brands)
        //        {
        //            context.Categories.Add(category);
        //        }
        //        context.SaveChanges();

        //        Console.WriteLine("{0} rows were written to database", brands.Count);
        //    }
        //}

        //static void LoadSupermarkets()
        //{
        //    start = DateTime.Now;
        //    var brands = foodFinder.FetchBrands(4).ToList();
        //    end = DateTime.Now;
        //    Console.WriteLine(" {0} ms\n", (end - start).TotalMilliseconds);
        //    Console.WriteLine("{0} brands fetched:", brands.Count);
        //    Console.WriteLine("\n");
        //    using (var context = new SecretDatabaseEntities())
        //    {
        //        foreach (var category in brands)
        //        {
        //            context.Categories.Add(category);
        //        }
        //        context.SaveChanges();

        //        Console.WriteLine("{0} rows were written to database", brands.Count);
        //    }
        //}

        //static void LoadCategoryProducts()
        //{

        //    foreach (var category in foodFinder.Categories)
        //    {
        //        Console.WriteLine("Go to {0} category", category.Name);
        //        Console.WriteLine("Fetching products list...");
        //        start = DateTime.Now;
        //        var list = foodFinder.FetchCategoryProducts(category);
        //        end = DateTime.Now;
        //        Console.WriteLine(" {0} ms\n", (end - start).TotalMilliseconds);
        //        Console.WriteLine("{0} products fetched", list.Count());
        //        using (var context = new SecretDatabaseEntities())
        //        {
        //            foreach (var product in category.ProductLinks.Where(p => p.Id < 1))
        //            {
        //                context.ProductLinks.Add(new ProductLink
        //                {
        //                    Name = product.Name,
        //                    CategoryId = product.Category.Id,
        //                    Link = product.Link
        //                });
        //            }
        //            context.SaveChanges();
        //            Console.WriteLine("{0} rows were written to database");
        //        }
        //    }

        //}

        static void TransferCategories()
        {
            var secretContext = new Secret.SecretDatabaseEntities();
            var scheduleContext = new Core.DAL.EasyScheduleDatabaseEntities();
            foreach (var category in secretContext.Categories)
            {
                scheduleContext.Categories.Add(new Core.DAL.Category
                                                   {
                                                       Id = category.Id,
                                                       Name = category.Name,
                                                       CategoryTypeId = category.CategoryTypeId
                                                   });
                scheduleContext.SaveChanges();
            }
            secretContext.Dispose();
            scheduleContext.Dispose();
        }


        static void TransferProducts()
        {
            var secretContext = new Secret.SecretDatabaseEntities();
            var scheduleContext = new Core.DAL.EasyScheduleDatabaseEntities();
            foreach (var product in secretContext.Products.Where(p=>!p.IsTransported))
            {
                scheduleContext.Products.Add(new Core.DAL.Product
                {
                    Name = product.Name,
                    CategoryId = product.CategoryId,
                    Calories = product.Calories,
                    Carbohydrates = product.Carbohydrates,
                    Fats = product.Fats,
                    Proteins = product.Proteins,
                    MeasurementUnit = product.PortionName,
                    Size = product.PortionSize.Value
                });
              //  product.IsTransported = true;
             //   secretContext.SaveChanges();
            }
            scheduleContext.SaveChanges();
            secretContext.Dispose();
            scheduleContext.Dispose();
        }
    }
}
