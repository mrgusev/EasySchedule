using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using EasySchedule.Core.DAL;
namespace EasySchedule.Client
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        EasyScheduleDatabaseEntities context = new EasyScheduleDatabaseEntities();

        private ObservableCollection<Portion> _tempPortions = new ObservableCollection<Portion>();
        public MainWindow()
        {
            InitializeComponent();
            context.MeasurmentTypes.Load();
            context.Products.Load();
            context.ProductTypes.Load();
            context.Categories.Load();
            context.InsulinUsages.Load();
            context.Shugars.Load();
            context.FoodUsages.Load();
            
            
            MeasurmentTypeComboBox.ItemsSource = context.MeasurmentTypes.ToList();
            ProductTypeComboBox.ItemsSource = context.ProductTypes.ToList();
            CategoryComboBox.ItemsSource = context.Categories.ToList();
            InsulinTypeComboBox.ItemsSource = context.InsulinTypes.ToList();


            ProductDataGrid.ItemsSource = context.Products.Local;
            //ProductTypeDataGrid.ItemsSource = context.ProductTypes.Local;
            //MeasureTypeDataGrid.ItemsSource = context.MeasurmentTypes.Local;
            CategoryDataGrid.ItemsSource = context.Categories.Local;
            InsuinDataGrid.ItemsSource = context.InsulinUsages.Local;
            SugarDataGrid.ItemsSource = context.Shugars.Local;
            FoodUsageDataGrid.ItemsSource = context.FoodUsages.Local;

            //----------------------------------------------------------

            InsulinTimePicker.TimeInterval = TimeSpan.FromMinutes(5);
            InsulinTypeAddComboBox.ItemsSource = context.InsulinTypes.Local;
            InsulinTypeAddComboBox.SelectedValue = 1;
            InsulinDatePicker.SelectedDate = DateTime.Today;
            InsulinTimePicker.Value = DateTime.Now;
            InsulinValueTextBox.Text = 4.ToString();

            ShugarTimePicker.TimeInterval = TimeSpan.FromMinutes(5);
            ShugarDatePicker.SelectedDate = DateTime.Today;
            ShugarTimePicker.Value = DateTime.Now;
            ShugarValueTextBox.Text = 4.ToString();

            FoodUsageDatePicker.SelectedDate = DateTime.Today;
            FoodUsageTimePicker.Value = DateTime.Now;

            PortionProductComboBox.ItemsSource = context.Products.Local;
            PortionProductComboBox.SelectedIndex = 0;
            PortionsDataGrid.ItemsSource = _tempPortions;
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            context.SaveChanges();
            MeasurmentTypeComboBox.ItemsSource = context.MeasurmentTypes.ToList();
            ProductTypeComboBox.ItemsSource = context.ProductTypes.ToList();
            CategoryComboBox.ItemsSource = context.Categories.ToList();

        }

        private void InsulinButton_Click_1(object sender, RoutedEventArgs e)
        {
            //InsulinTimePicker.Value = InsulinDatePicker.SelectedDate.Value.
            var time = InsulinDatePicker.SelectedDate.Value.Add(InsulinTimePicker.Value.Value - InsulinTimePicker.Value.Value.Date);
            
            context.InsulinUsages.Add(new InsulinUsage
                                          {
                                              InsulinTypeId = (int) InsulinTypeAddComboBox.SelectedValue,
                                              Time = time,
                                              Value = double.Parse(InsulinValueTextBox.Text)
                                          });
            context.SaveChanges();
        }

        private void ShugarButton_Click_1(object sender, RoutedEventArgs e)
        {
            context.Shugars.Add(new Shugar
            {
                Time = ShugarTimePicker.Value.Value,
                Value = double.Parse(ShugarValueTextBox.Text)
            });
            context.SaveChanges();
        }

        private void AddPortionButton_Click(object sender, RoutedEventArgs e)
        {
            var product = (Product) PortionProductComboBox.SelectedItem;
            var amount = double.Parse(AmountTextBox.Text);
            var coeff = amount/product.AmountPerOne;
            _tempPortions.Add(new Portion
                                  {
                                      Amount = amount,
                                      Product = product,
                                      BreadUnits = amount/product.AmountPerOne,
                                      Value = coeff*product.ValuePerOne
                                  });
            TotalBreadUnitsTextBlock.Text = _tempPortions.Sum(p => p.BreadUnits).ToString();
        }

        private void AddFoodUsageButton_Click(object sender, RoutedEventArgs e)
        {
            context.FoodUsages.Add(new FoodUsage
                                       {
                                           Time = FoodUsageTimePicker.Value.Value,
                                           BreadUnits = _tempPortions.Sum(p => p.BreadUnits),
                                           Portions = _tempPortions.ToList()
                                       });
            context.SaveChanges();
            _tempPortions.Clear();
        }

    }
}
