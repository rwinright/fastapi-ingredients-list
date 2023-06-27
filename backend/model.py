#import BaseModel
from pydantic import BaseModel
#import optional
from typing import Optional

#create Ingredient model
class Ingredient(BaseModel):
    id: int
    name: str
    quantity: int

#create Todo model
class TodoItem(BaseModel):
    id: int
    task: str
    complete: bool