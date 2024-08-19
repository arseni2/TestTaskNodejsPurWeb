import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUser1723983528047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the "user" table
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));

        // Create the "column" table
        await queryRunner.createTable(new Table({
            name: "column",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));

        // Create the "card" table
        await queryRunner.createTable(new Table({
            name: "card",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "columnId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "userId",  // Added this line
                    type: "int",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));

        // Create foreign key relationship between "column" and "user" tables
        await queryRunner.createForeignKey("column", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        // Create foreign key relationship between "card" and "column" tables
        await queryRunner.createForeignKey("card", new TableForeignKey({
            columnNames: ["columnId"],
            referencedColumnNames: ["id"],
            referencedTableName: "column",
            onDelete: "CASCADE"
        }));

        // Create foreign key relationship between "card" and "user" tables
        await queryRunner.createForeignKey("card", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key relationships
        const columnTable = await queryRunner.getTable("column");
        const columnForeignKey = columnTable.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("column", columnForeignKey);

        const cardTable = await queryRunner.getTable("card");
        const cardForeignKey = cardTable.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        if (cardForeignKey) {
            await queryRunner.dropForeignKey("card", cardForeignKey);
        }

        const columnForeignKey2 = cardTable.foreignKeys.find(fk => fk.columnNames.indexOf("columnId") !== -1);
        await queryRunner.dropForeignKey("card", columnForeignKey2);

        // Drop the "card" table
        await queryRunner.dropTable("card");

        // Drop the "column" table
        await queryRunner.dropTable("column");

        // Drop the "user" table
        await queryRunner.dropTable("user");
    }
}
