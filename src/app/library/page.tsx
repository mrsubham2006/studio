
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Library, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import freeBooksData from '@/lib/free-books.json';

type Book = {
    id: string;
    title: string;
    author: string;
    description: string;
    imageId: string;
    downloadUrl: string;
};

const BookCard = ({ book }: { book: Book }) => {
    const bookImage = PlaceHolderImages.find(img => img.id === book.imageId);

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader className="p-0">
                {bookImage && (
                     <Image
                        src={bookImage.imageUrl}
                        alt={book.title}
                        data-ai-hint={bookImage.imageHint}
                        width={300}
                        height={400}
                        className="object-cover w-full aspect-[3/4]"
                    />
                )}
            </CardHeader>
            <CardContent className="flex-1 p-4">
                <CardTitle className="font-headline text-lg leading-tight mb-1">{book.title}</CardTitle>
                <CardDescription>by {book.author}</CardDescription>
                <p className="text-sm text-muted-foreground mt-2 h-20 overflow-hidden">{book.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                 <Button className="w-full" asChild>
                    <a href={book.downloadUrl} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
};


export default function LibraryPage() {
    const books: Book[] = freeBooksData.books;

  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-7xl">
            <div className="text-center mb-12">
                <Library className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                    Free Digital Library
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
                    Access a curated collection of free books and resources to support your learning. Download and read them anytime.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

             {books.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p>The library is currently empty. Check back later for free books!</p>
                </div>
            )}
        </div>
      </main>
    </>
  );
}

