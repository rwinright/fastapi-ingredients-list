#import BaseModel
from pydantic import BaseModel
#import optional
from typing import Optional

#create Ingredient model
class Ingredient(BaseModel):
    id: int
    name: str
    quantity: int