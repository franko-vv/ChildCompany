using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ChildCompany.DAL.EntityFramework;

namespace ChildCompany.Migrations
{
    [DbContext(typeof(EFCompanyContext))]
    partial class EFCompanyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ChildCompany.DAL.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ChildMoney");

                    b.Property<string>("Name");

                    b.Property<int>("OwnMoney");

                    b.Property<int?>("ParentId");

                    b.HasKey("Id");
                });
        }
    }
}
