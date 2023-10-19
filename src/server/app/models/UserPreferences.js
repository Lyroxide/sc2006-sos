class UserPreferences{
    constructor(){
        this.regionalPreferences = regionalPreferences();
        this.foodPreferences = foodPreferences();
    }

    regionalPreferences(){
        return ['North', 'South', 'East', 'West', 'Central'];
    }
    foodPreferences(){
        return ['Spicy', 'Sweet' , 'Sour', 'Bitter', 'Vegetarian', 'Western', 'Chinese', 'Indian']
    }
}