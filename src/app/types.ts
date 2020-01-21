export type Person = {
    id: string;
    name: string;
}

export type PersonId = {
    id: string;
}
// etc

export type PersonQuery = {
    allPersons: Person[];
}

export type PersonIdQuery = {
    allPersons: PersonId[];
}

export type Country = {
    full_name_english: string;
    full_name_locale: string;
}
// etc

export type CountryQuery = {
    countries: Country[];
}