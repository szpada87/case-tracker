using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    /// <inheritdoc />
    public partial class AddDebtorEntries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DebtorId",
                table: "CaseEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DebtorEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DebtorEntries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CaseEntries_DebtorId",
                table: "CaseEntries",
                column: "DebtorId");

            migrationBuilder.AddForeignKey(
                name: "FK_CaseEntries_DebtorEntries_DebtorId",
                table: "CaseEntries",
                column: "DebtorId",
                principalTable: "DebtorEntries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CaseEntries_DebtorEntries_DebtorId",
                table: "CaseEntries");

            migrationBuilder.DropTable(
                name: "DebtorEntries");

            migrationBuilder.DropIndex(
                name: "IX_CaseEntries_DebtorId",
                table: "CaseEntries");

            migrationBuilder.DropColumn(
                name: "DebtorId",
                table: "CaseEntries");
        }
    }
}
