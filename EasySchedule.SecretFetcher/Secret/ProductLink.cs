//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EasySchedule.SecretFetcher.Secret
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProductLink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public int CategoryId { get; set; }
        public string Info { get; set; }
        public bool IsFetched { get; set; }
    
        public virtual Category Category { get; set; }
    }
}
