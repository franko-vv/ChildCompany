using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ChildCompany.Models;

namespace ChildCompany.Migrations
{
    [DbContext(typeof(CompanyContext))]
    partial class CompanyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ChildCompany.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ChildMoney");

                    b.Property<int?>("CompanyId");

                    b.Property<string>("CompanyName");

                    b.Property<int>("OwnMoney");

                    b.Property<int>("Parent_Id");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("ChildCompany.Models.Company", b =>
                {
                    b.HasOne("ChildCompany.Models.Company")
                        .WithMany()
                        .HasForeignKey("CompanyId");
                });
        }
    }
}
