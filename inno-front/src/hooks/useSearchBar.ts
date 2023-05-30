import { useState } from "react";
import { IArticleSearch } from "../types";

export interface SearchBarProps {
    searchHander: (props: IArticleSearch) => void;
}

const useSearchBar = ({ searchHander }: SearchBarProps) => {
    const [query, setQuery] = useState<string>('');
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
    const [selectedSource, setSelectedSource] = useState<number[]>([]);

    const resetHandler = () => {
        setSelectedCategory([]);
        setSelectedSource([]);
        setFrom('');
        setTo('');
    };

    const resetDisabled = () => {
        if (selectedCategory.length > 0 || selectedSource.length > 0 || from || to) {
            return false;
        }
        return true;
    };

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        searchHander({
            query: query,
            category: selectedCategory.join(','),
            source: selectedSource.join(','),
            from: from,
            to: to
        });

        setQuery('');
        setSelectedCategory([]);
        setSelectedSource([]);
        setFrom('');
        setTo('');
    };

    return {
        query,
        setQuery,
        from,
        setFrom,
        to,
        setTo,
        selectedCategory,
        setSelectedCategory,
        selectedSource,
        setSelectedSource,
        resetHandler,
        resetDisabled,
        formHandler
    };
}

export default useSearchBar;