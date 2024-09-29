// Essa é a cama camada de negócio do sistema, é como se fosse o núcleo de todo o projeto

export type ProductProp = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(private props: ProductProp) {
    this.validateQuantity();
  }

  public static create(name: string, price: number) {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      quantity: 0,
    });
  }

  public static with(props: ProductProp) {
    return new Product(props);
  }

  private validateQuantity() {
    if (this.props.quantity < 0) {
      throw new Error("The product should be positive");
    }
  }

  public getId() {
    return this.props.id;
  }

  public getName() {
    return this.props.name;
  }

  public getPrice() {
    return this.props.price;
  }

  public getQuantity() {
    return this.props.quantity;
  }

  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity;
  }

  public decreaseQuantity(quantity: number){
    this.props.quantity -= quantity
  }
}
