import bookTable, { BookTableItem } from "./schema"

describe("Book table schema", () => {
  type FieldValidator = 
    & Pick<(typeof bookTable)[keyof BookTableItem], 'name' | 'isUnique' | 'primary' | 'notNull' | 'columnType'>
    & { name: keyof BookTableItem }

  it("Has the right fields", () => {
    const fieldValidator: FieldValidator[] = [
      {
        name: 'id',
        columnType: 'SQLiteInteger',
        primary: true,
        notNull: true,
        isUnique: false,
      },
      {
        name: 'title',
        columnType: 'SQLiteText',
        primary: false,
        notNull: true,
        isUnique: true,
      },
      {
        name: 'description',
        columnType: 'SQLiteText',
        primary: false,
        notNull: false,
        isUnique: false,
      },
      {
        name: 'publishDate',
        columnType: 'SQLiteText',
        primary: false,
        notNull: true,
        isUnique: false,
      }
    ];

    fieldValidator.forEach((validator) => {
      expect(bookTable).toHaveProperty(validator.name);
      expect(bookTable[validator.name]).toMatchObject(validator)
    })
  })
})
