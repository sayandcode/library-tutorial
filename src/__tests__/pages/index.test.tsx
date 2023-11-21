import Page, { getServerSideProps } from "@/pages"
import { getBooks } from "../../db/tables/book/handlers"
import { GetServerSidePropsContext } from "next"
import mockBooksList from "@/db/tables/book/data.mock"
import React from "react"

jest.mock("../../db/tables/book/handlers")
jest.mock("../../db/setup")
const mockedGetBooks = jest.mocked(getBooks);

describe('Index page getServerSideProps', () => {
  it('Should return the books from the database', async () => {
    const context = {} as GetServerSidePropsContext;

    mockedGetBooks.mockResolvedValueOnce({ success: true, data: [mockBooksList[0]] });
    const gsspResult1 = await getServerSideProps(context)
    expect(gsspResult1).toEqual({
      props: {
        booksArr: [mockBooksList[0]]
      }
    })

    mockedGetBooks.mockResolvedValueOnce({ success: true, data: [mockBooksList[1], mockBooksList[2]] });
    const gsspResult2 = await getServerSideProps(context)
    expect(gsspResult2).toEqual({
      props: {
        booksArr: [mockBooksList[1], mockBooksList[2]]
      }
    })
  })

  it('Should throw a 500 error if database refuses to respond', async () => {
    mockedGetBooks.mockResolvedValueOnce({
      success: false,
      err: {code: "foo", message: "bar"}
    });
    const context = { res: { statusCode: null } } as any as GetServerSidePropsContext;
    try {
      await getServerSideProps(context)
    } catch (err) {
      expect(context.res.statusCode).toBe(500)
      expect(err).toEqual(new Error("Could not fetch books for homepage"))
    }
  });
})

describe("Index page", ()=>{
  it('Exports a react component', ()=>{
    expect(React.isValidElement(<Page booksArr={{} as React.ComponentProps<typeof Page>['booksArr']} />)).toBe(true)
  })
})
