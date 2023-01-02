from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

#For the ingredients 
from model import Ingredient

#create appp
app = FastAPI()

origins = ['*','https://localhost','https://localhost:3000', 'https://localhost:8000']

#add cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ingredients = {
    1: Ingredient(id=1, name="Milk", quantity=1),
    2: Ingredient(id=2, name="Eggs", quantity=2),
    3: Ingredient(id=3, name="Flour", quantity=3),
}

@app.get("/ingredients")
def get_ingredients():
    return list(ingredients.values())

#push new ingredient
@app.post("/ingredients")
def add_ingredient(ingredient: Ingredient):
    ingredients[ingredient.id] = ingredient
    return ingredient

#delete ingredient
@app.delete("/ingredients/{ingredient_id}")
def delete_ingredient(ingredient_id: int):
    ingredients.pop(ingredient_id)
    return {}

# @app.get("/")
# def read_root():
#     return {"Ping": "Pong"}