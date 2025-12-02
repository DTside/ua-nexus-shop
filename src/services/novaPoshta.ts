// Типы данных
export interface City {
    Ref: string;
    Description: string; // Название города
}

export interface Warehouse {
    Ref: string;
    Description: string; // Название отделения
}

// ИМИТАЦИЯ БАЗЫ (Работает без интернета и ключей)
const MOCK_CITIES = [
    { Ref: 'Kyiv', Description: 'Київ' },
    { Ref: 'Lviv', Description: 'Львів' },
    { Ref: 'Odessa', Description: 'Одеса' },
    { Ref: 'Kharkiv', Description: 'Харків' },
    { Ref: 'Dnipro', Description: 'Дніпро' },
    { Ref: 'Brovary', Description: 'Бровари' },
];

const MOCK_WAREHOUSES: Record<string, Warehouse[]> = {
    'Kyiv': [
        { Ref: '1', Description: 'Відділення №1: вул. Пирогівський шлях, 135' },
        { Ref: '2', Description: 'Відділення №2: вул. Бережанська, 9' },
        { Ref: '3', Description: 'Поштомат №5001: вул. Хрещатик, 22' },
    ],
    'Lviv': [
        { Ref: '1', Description: 'Відділення №1: вул. Городоцька, 355/6' },
    ],
    // Для остальных городов вернет дефолт
};

export const searchCities = async (query: string): Promise<City[]> => {
    // Имитация задержки поиска
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query) return [];
    
    return MOCK_CITIES.filter(city => 
        city.Description.toLowerCase().includes(query.toLowerCase())
    );
};

export const getWarehouses = async (cityRef: string): Promise<Warehouse[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Если для города нет базы, возвращаем дефолтные отделения
    return MOCK_WAREHOUSES[cityRef] || [
        { Ref: '999', Description: 'Відділення №1 (Центральне)' },
        { Ref: '998', Description: 'Поштомат №100 (Біля АТБ)' }
    ];
};