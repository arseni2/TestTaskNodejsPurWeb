import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateComment1724074189384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the comment table
        await queryRunner.createTable(new Table({
            name: "comment",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "content",
                    type: "text",
                },
                {
                    name: "cardId",
                    type: "int",
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
            ],
        }), true);

        // Add foreign key to cardId
        await queryRunner.createForeignKey("comment", new TableForeignKey({
            columnNames: ["cardId"],
            referencedColumnNames: ["id"],
            referencedTableName: "card",
            onDelete: "CASCADE",
        }));

        // Add foreign key to userId
        await queryRunner.createForeignKey("comment", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign keys
        await queryRunner.dropForeignKey("comment", "FK_comment_cardId");
        await queryRunner.dropForeignKey("comment", "FK_comment_userId");

        // Drop the comment table
        await queryRunner.dropTable("comment");
    }

}
