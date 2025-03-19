package me.springdataredis;

public class BookMain {
    public static void main(String[] args) {
        Book book = Book.builder().build();
        System.out.println("book = " + book);
    }
}
