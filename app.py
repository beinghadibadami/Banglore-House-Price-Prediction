import streamlit as st
import requests
# Set up the custom CSS for styling
st.markdown("""
    <style>
     .main {
        background-color: #0E100F;
        color: #0AE448;
    }
    .streamlit-expanderHeader {
        color: #0AE448;
    }
    .css-1v3fvcr {
        color: #0AE448;
    }
    
    .stTextInput>div>input {
        background-color: #0E100F;
        color: #0AE448;
        border: 1px solid #0AE448;
    }
    .stSelectbox>div>div {
        background-color: #0E100F;
        color: #0AE448;
        border: 1px solid #0AE448;
    }
    .stNumberInput>div>div>input {
        background-color: #0E100F;
        color: #0AE448;
        border: 1px solid #0AE448;
    }
    .footer {
        text-align: center;
        color: #0AE448;
        font-size: 14px;
        margin-top: 20px;
    }
    .stButton>button {
        background-color:#0AE448 ;
        color: #0E100F;
        border: none;
    }
    </style>
    """, unsafe_allow_html=True)

# Replace with your actual deployed Flask server URL
FLASK_SERVER_URL = 'https://banglore-house-price-prediction-0ssa.onrender.com'

# Fetch locations
def fetch_locations():
    response = requests.get(f'{FLASK_SERVER_URL}/get_location_names')
    if response.status_code == 200:
        return response.json()['locations']
    else:
        st.error('Error fetching location names from server.')
        return []

# Predict house price
def predict_price(location, total_sqft, bhk, bath):
    response = requests.post(f'{FLASK_SERVER_URL}/predict_house_price', data={
        'location': location,
        'total_sqft': total_sqft,
        'bhk': bhk,
        'bath': bath
    })
    if response.status_code == 200:
        return response.json()['estimated_price']
    else:
        st.error('Error predicting house price.')
        return None

# Create a Streamlit form
st.title('Banglore House Price Estimator')

locations = fetch_locations()

with st.form(key='property_form'):
    
    location = st.selectbox('Select Location', options=locations)
    
    total_sqft = st.number_input('Enter Total Square Feet', min_value=0, step=1)
    
    bhk = st.number_input('Enter Number of BHK', min_value=1, step=1)
    
    bath = st.number_input('Enter Number of Bathrooms', min_value=1, step=1)

    col1, col2, col3 = st.columns([1, 0.5, 1])
    with col2:  
        submit_button=st.form_submit_button('Submit')

# Form submission logic
if submit_button:
    estimated_price = predict_price(location, total_sqft, bhk, bath)
    if estimated_price is not None:
        st.write(f'Estimated Price: ₹ {estimated_price:.2f} Lakh')
    

# Developer credit section
st.markdown("""
    <div class="footer">
        Developed by - M.Hadi Badami
    </div>
    """, unsafe_allow_html=True)
