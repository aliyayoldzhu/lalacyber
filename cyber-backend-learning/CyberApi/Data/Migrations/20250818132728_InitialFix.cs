using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_Brand",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_Category",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_Model",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Favorites",
                table: "Favorites");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CartItems",
                table: "CartItems");

            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "products",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "Favorites",
                newName: "favorites",
                newSchema: "public");

            migrationBuilder.RenameTable(
                name: "CartItems",
                newName: "cart_items",
                newSchema: "public");

            migrationBuilder.RenameColumn(
                name: "Status",
                schema: "public",
                table: "products",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Specs",
                schema: "public",
                table: "products",
                newName: "specs");

            migrationBuilder.RenameColumn(
                name: "Price",
                schema: "public",
                table: "products",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "public",
                table: "products",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Model",
                schema: "public",
                table: "products",
                newName: "model");

            migrationBuilder.RenameColumn(
                name: "Image",
                schema: "public",
                table: "products",
                newName: "image");

            migrationBuilder.RenameColumn(
                name: "Features",
                schema: "public",
                table: "products",
                newName: "features");

            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "public",
                table: "products",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Category",
                schema: "public",
                table: "products",
                newName: "category");

            migrationBuilder.RenameColumn(
                name: "Brand",
                schema: "public",
                table: "products",
                newName: "brand");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "public",
                table: "products",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "public",
                table: "products",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "TechnicalSpecs",
                schema: "public",
                table: "products",
                newName: "technical_specs");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "public",
                table: "products",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "public",
                table: "favorites",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                schema: "public",
                table: "favorites",
                newName: "product_id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "public",
                table: "favorites",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                schema: "public",
                table: "cart_items",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "public",
                table: "cart_items",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "IsSelected",
                schema: "public",
                table: "cart_items",
                newName: "is_selected");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "public",
                table: "cart_items",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                schema: "public",
                table: "cart_items",
                newName: "product_id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "public",
                table: "cart_items",
                newName: "user_id");

            migrationBuilder.AlterColumn<decimal>(
                name: "price",
                schema: "public",
                table: "products",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(12,2)");

            migrationBuilder.AlterColumn<string[]>(
                name: "features",
                schema: "public",
                table: "products",
                type: "text[]",
                nullable: true,
                oldClrType: typeof(List<string>),
                oldType: "text[]");

            migrationBuilder.AlterColumn<DateTime>(
                name: "updated_at",
                schema: "public",
                table: "products",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "technical_specs",
                schema: "public",
                table: "products",
                type: "jsonb",
                nullable: true,
                oldClrType: typeof(Dictionary<string, string>),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                schema: "public",
                table: "products",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                schema: "public",
                table: "favorites",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<Guid>(
                name: "id",
                schema: "public",
                table: "favorites",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<int>(
                name: "quantity",
                schema: "public",
                table: "cart_items",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 1);

            migrationBuilder.AlterColumn<DateTime>(
                name: "updated_at",
                schema: "public",
                table: "cart_items",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                schema: "public",
                table: "cart_items",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<Guid>(
                name: "id",
                schema: "public",
                table: "cart_items",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "pk_products",
                schema: "public",
                table: "products",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_favorites",
                schema: "public",
                table: "favorites",
                columns: new[] { "user_id", "product_id" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_cart_items",
                schema: "public",
                table: "cart_items",
                columns: new[] { "user_id", "product_id" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_products",
                schema: "public",
                table: "products");

            migrationBuilder.DropPrimaryKey(
                name: "pk_favorites",
                schema: "public",
                table: "favorites");

            migrationBuilder.DropPrimaryKey(
                name: "pk_cart_items",
                schema: "public",
                table: "cart_items");

            migrationBuilder.DropColumn(
                name: "id",
                schema: "public",
                table: "favorites");

            migrationBuilder.DropColumn(
                name: "id",
                schema: "public",
                table: "cart_items");

            migrationBuilder.RenameTable(
                name: "products",
                schema: "public",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "favorites",
                schema: "public",
                newName: "Favorites");

            migrationBuilder.RenameTable(
                name: "cart_items",
                schema: "public",
                newName: "CartItems");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Products",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "specs",
                table: "Products",
                newName: "Specs");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "Products",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Products",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "model",
                table: "Products",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "image",
                table: "Products",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "features",
                table: "Products",
                newName: "Features");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Products",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "category",
                table: "Products",
                newName: "Category");

            migrationBuilder.RenameColumn(
                name: "brand",
                table: "Products",
                newName: "Brand");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Products",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "Products",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "technical_specs",
                table: "Products",
                newName: "TechnicalSpecs");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Products",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Favorites",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "Favorites",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Favorites",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "CartItems",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "CartItems",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "is_selected",
                table: "CartItems",
                newName: "IsSelected");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "CartItems",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "CartItems",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "CartItems",
                newName: "UserId");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Products",
                type: "numeric(12,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<List<string>>(
                name: "Features",
                table: "Products",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(string[]),
                oldType: "text[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Products",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<Dictionary<string, string>>(
                name: "TechnicalSpecs",
                table: "Products",
                type: "jsonb",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Products",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Favorites",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "CartItems",
                type: "integer",
                nullable: false,
                defaultValue: 1,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "CartItems",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "CartItems",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Favorites",
                table: "Favorites",
                columns: new[] { "UserId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CartItems",
                table: "CartItems",
                columns: new[] { "UserId", "ProductId" });

            migrationBuilder.CreateIndex(
                name: "IX_Products_Brand",
                table: "Products",
                column: "Brand");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Category",
                table: "Products",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Model",
                table: "Products",
                column: "Model");
        }
    }
}
