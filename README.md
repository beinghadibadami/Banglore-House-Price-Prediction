# Bangalore House Price Prediction

This is a data science project that uses Linear Regression to predict house prices in Bangalore based on various features such as location, total square feet, number of bedrooms (BHK), and number of bathrooms. The project involves data cleaning, handling outliers, exploratory data analysis, feature engineering, model creation, hyperparameter tuning using GridSearchCV, and deploying the model using a Flask server. Additionally, a Streamlit-based user interface has been developed to allow users to input data and receive predictions interactively.

## Project Overview

### 1. Data Cleaning
- Removed missing values and handled inconsistencies in the dataset.
- Addressed duplicate records and corrected erroneous data entries.

### 2. Handling Outliers
- Identified and removed outliers in the dataset to improve model accuracy.
- Used statistical methods to detect anomalies in features like total square feet and price per square feet.

### 3. Exploratory Data Analysis
- Conducted visualizations and statistical analysis to understand the relationships between different features.
- Analyzed the distribution of house prices across different locations in Bangalore.

### 4. Feature Engineering
- Created new features to improve model performance, such as price per square foot.
- Transformed categorical variables (e.g., location) into numerical values using techniques like one-hot encoding.

### 5. Model Creation
- Built a Linear Regression model to predict house prices based on the cleaned and engineered dataset.
- Evaluated the model's performance using metrics like R-squared and Mean Absolute Error (MAE).

### 6. Hyperparameter Tuning
- Used GridSearchCV to find the best model parameters and improve prediction accuracy.
- Explored different combinations of hyperparameters to optimize the Linear Regression model.

### 7. Deployment with Flask
- Deployed the trained model using a Flask server to handle HTTP requests.
- Created endpoints to receive input data and return predicted house prices.

### 8. Interactive User Interface with Streamlit
- Developed a simple and interactive user interface using Streamlit.
- The interface allows users to input features such as location, total square feet, BHK, and the number of bathrooms to predict house prices.
- The user-friendly design enables users to easily interact with the model and obtain predictions.

## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Data-Science-Project.git
cd Data-Science-Project
