## Entidades e Responsabilidades

### 🧑 Customer

Representa o cliente do sistema.

**Campos**

* `id` (string) – identificador único
* `name`
* `email`
* `phone`
* `status`

**Responsabilidades**

* Armazenar dados cadastrais do cliente
* Servir como vínculo para pedidos realizados

**Relacionamentos**

* Um **Customer** pode possuir vários **Orders**
* Um **Order** pertence a um único **Customer**

---

### 🗂️ Category

Representa a classificação dos produtos.

**Campos**

* `id`
* `name`
* `description`
* `status`

**Responsabilidades**

* Organizar e agrupar produtos por tipo ou finalidade

**Relacionamentos**

* Uma **Category** pode possuir vários **Products**
* Um **Product** pertence a uma única **Category**

---

### 📦 Product

Representa os itens comercializados no sistema.

**Campos**

* `id`
* `name`
* `description`
* `price`
* `stock`
* `categoryId`
* `status`

**Responsabilidades**

* Manter informações comerciais do produto
* Controlar estoque disponível
* Vincular-se a uma categoria

**Relacionamentos**

* Pertence a uma **Category**
* Pode aparecer em vários pedidos, via **OrderItem**

---

### 🧾 Order

Representa um pedido realizado por um cliente.

**Campos**

* `id`
* `customerId` 
* `orderDate`
* `orderStatus`
* `totalAmount`
* `status`

**Responsabilidades**

* Registrar a compra realizada pelo cliente
* Consolidar valores totais do pedido
* Manter o estado do pedido (ex.: pendente, cancelado...)

**Relacionamentos**

* Pertence a um **Customer**
* Possui vários **OrderItems**

---

### 🔗 OrderItem

Representa os itens individuais de um pedido.

**Campos**

* `id`
* `orderId` (FK)
* `productId` (FK)
* `quantity`
* `price` – preço do produto no momento da compra

**Responsabilidades**

* Relacionar produtos a pedidos
* Armazenar quantidade e preço histórico do produto

**Relacionamentos**

* Pertence a um **Order**
* Referencia um **Product**
