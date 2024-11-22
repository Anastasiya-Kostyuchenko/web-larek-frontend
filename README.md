# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

Используемый паттерн проектирования
Проект реализован на основе паттерна MVP. Взаимодействие между Моделью и Представлением реализовано через события пользователя.

Основные классы и их назначение

1.Модели (Model)
Класс: ProductModel
Отвечает за управление данными товаров в каталоге.
Поля:
private products: Product[] — список всех товаров.
Методы:
fetchProducts(): Promise<Product[]> — загружает список товаров через API.
getProductById(id: string): Product | undefined — возвращает товар по его идентификатору.

Класс CartModel
Описание: Управляет данными корзины.
Поля:
private cartItems: CartItem[] — список товаров в корзине.
Методы:
addItem(product: Product): void — добавляет товар в корзину.
removeItem(productId: string): void — удаляет товар из корзины.
getItems(): CartItem[] — возвращает список товаров в корзине.

Класс OrderModel
Описание: Управляет данными заказа.
Поля:
private orderData: Order | null — данные текущего заказа.
Методы:
createOrder(order: Order): void — сохраняет данные нового заказа.
clearOrder(): void — очищает данные текущего заказа.

2. Представление (View)

Класс CatalogView
Описание: Отображает список товаров.
Методы:
render(products: Product[]): void — отображает список товаров.
onProductClick(handler: (productId: string) => void): void — связывает обработчик события клика на карточку товара.

Класс CartView
Описание:Отображает добавленные товары и позволяет их удалять.
Методы:
render(cartItems: CartItem[]): void — отображает товары в корзине.
onAddToCart(handler: (productId: string) => void): void — связывает обработчик добавления товара в корзину.
onRemoveFromCart(handler: (productId: string) => void): void — связывает обработчик удаления товара из корзины.

Класс OrderView
Описание: Отвечает за процесс оформления заказа.
Методы:
renderStepOne(): void — отображает первый шаг оформления заказа (выбор способа оплаты и адреса).
renderStepTwo(): void — отображает второй шаг оформления заказа (контактные данные).
onSubmitOrder(handler: (order: Order) => void): void — связывает обработчик отправки заказа.

Класс ModalView
Описание: Управляет отображением модальных окон.
Методы:
show(content: string): void — показывает модальное окно.
hide(): void — скрывает модальное окно.

3. Презентер (Presenter)

Класс CatalogPresenter
Описание: Связывает модели и представления.
Поля:
private model: ProductModel
private view: CatalogView
Методы:
init(): void — загружает данные и передаёт их в представление.
onProductClick(productId: string): void — обрабатывает клик на карточке товара.

Класс CartPresenter
Описание: Связывает корзину с моделью и представлением.
Поля:
private model: CartModel
private view: CartView
Методы:
init(): void — отображает текущее состояние корзины.
onAddToCart(productId: string): void — добавляет товар в корзину.
onRemoveFromCart(productId: string): void — удаляет товар из корзины.

Класс OrderPresenter
Описание: Связывает процесс оформления заказа с моделью и представлением.
Поля:
private model: OrderModel
private view: OrderView
Методы:
init(): void — инициализирует процесс оформления заказа.
onSubmitOrder(order: Order): void — сохраняет данные заказа и очищает корзину.

Взаимодействие между моделью и представлением будет реализовано с помощью события пользователя.
