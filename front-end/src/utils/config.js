export const TABLE_HEAD = ["Title", "Author", "Genre", "Status", "Publication Year", ""];
export const Invalid = 'Please Login';

export function filterData(searchText, books) {
    const data = books.filter((book) => {
        return book.title.toLowerCase().includes(searchText);
    });
    return data;
}
