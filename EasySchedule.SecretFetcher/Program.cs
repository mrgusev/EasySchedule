using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.SecretFetcher
{
    class Program
    {
        static void Main(string[] args)
        {
            var categories = new Dictionary<string, string>();
            var products = new Dictionary<string,string>();
            FoodFinder foodFinder  = new FoodFinder();
           
            DateTime start = DateTime.Now;
            DateTime end = DateTime.Now;
            string hostUrl = "http://fatsecret.ru";
            string url = "http://fatsecret.ru/%D0%BA%D0%B0%D0%BB%D0%BE%D1%80%D0%B8%D0%B8-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D0%B5/%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0/%D0%91%D0%BE%D0%B1%D1%8B-%D0%B8-%D0%91%D0%BE%D0%B1%D0%BE%D0%B2%D1%8B%D0%B5";
            string page = "";
            Console.WriteLine("Run fetching from url: {0}\n", url);
            Console.Write("Fetching categories...");
            start = DateTime.Now;
            page = WebPage.GetPage(url);
            categories = foodFinder.FetchFoodCategories(page);
            end = DateTime.Now;
            Console.WriteLine(" {0} ms\n", (end-start).TotalMilliseconds);
            Console.WriteLine("{0} categories fetched:", categories.Count);
            foreach (var category in categories)
            {
                Console.WriteLine("- {0}", category.Key);
            }
            Console.WriteLine("\n");
            foreach (var category in categories)
            {
                Console.WriteLine("Go to {0} category", category.Key);
                Console.WriteLine("Fetching products list..."); 
                start = DateTime.Now;
                page = WebPage.GetPage(category.Value);
                products = foodFinder.FetchProducts(page);
                end = DateTime.Now;
                Console.WriteLine(" {0} ms\n", (end - start).TotalMilliseconds);
                Console.WriteLine("{0} products fetched", products.Count);
                //foreach (var product in products)
                //{
                //    Console.WriteLine("- {0}", product.Key);
                //}
            }

            Console.ReadKey();
        }
    }
}
