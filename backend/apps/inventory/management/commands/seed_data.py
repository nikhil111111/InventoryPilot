from django.core.management.base import BaseCommand

from apps.products.models import Product
from apps.warehouses.models import Warehouse
from apps.inventory.models import Inventory


class Command(BaseCommand):
    help = "Seed sample inventory data"

    def handle(self, *args, **kwargs):

        Inventory.objects.all().delete()
        Product.objects.all().delete()
        Warehouse.objects.all().delete()

        delhi = Warehouse.objects.create(
            name="Delhi Warehouse",
            location="Delhi"
        )

        mumbai = Warehouse.objects.create(
            name="Mumbai Warehouse",
            location="Mumbai"
        )

        bangalore = Warehouse.objects.create(
            name="Bangalore Warehouse",
            location="Bangalore"
        )

        laptop = Product.objects.create(
            sku="LAP001",
            name="Laptop",
            description="Dell Inspiron Laptop",
            price=65000,
            reorder_threshold=10,
            reorder_quantity=20,
        )

        mouse = Product.objects.create(
            sku="MOU001",
            name="Mouse",
            description="Wireless Mouse",
            price=900,
            reorder_threshold=30,
            reorder_quantity=100,
        )

        keyboard = Product.objects.create(
            sku="KEY001",
            name="Keyboard",
            description="Mechanical Keyboard",
            price=2500,
            reorder_threshold=15,
            reorder_quantity=40,
        )

        monitor = Product.objects.create(
            sku="MON001",
            name="Monitor",
            description="24 Inch Monitor",
            price=12000,
            reorder_threshold=8,
            reorder_quantity=15,
        )

        headset = Product.objects.create(
            sku="HED001",
            name="Headset",
            description="Gaming Headset",
            price=3500,
            reorder_threshold=20,
            reorder_quantity=50,
        )

        Inventory.objects.bulk_create([
            Inventory(product=laptop, warehouse=delhi, quantity=2),
            Inventory(product=laptop, warehouse=mumbai, quantity=1),
            Inventory(product=laptop, warehouse=bangalore, quantity=0),

            Inventory(product=mouse, warehouse=delhi, quantity=60),
            Inventory(product=mouse, warehouse=mumbai, quantity=25),
            Inventory(product=mouse, warehouse=bangalore, quantity=10),

            Inventory(product=keyboard, warehouse=delhi, quantity=5),
            Inventory(product=keyboard, warehouse=mumbai, quantity=2),
            Inventory(product=keyboard, warehouse=bangalore, quantity=1),

            Inventory(product=monitor, warehouse=delhi, quantity=3),
            Inventory(product=monitor, warehouse=mumbai, quantity=1),
            Inventory(product=monitor, warehouse=bangalore, quantity=0),

            Inventory(product=headset, warehouse=delhi, quantity=40),
            Inventory(product=headset, warehouse=mumbai, quantity=10),
            Inventory(product=headset, warehouse=bangalore, quantity=0),
        ])

        self.stdout.write(
            self.style.SUCCESS("Sample inventory data seeded successfully.")
        )