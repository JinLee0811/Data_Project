
# **Where to Live?** 🏡  
A Personalized Location Recommendation Service Based on Perceived Time and Subway Crowdedness  

---

## **Project Overview** 💡  
"Where to Live?" is a service designed to assist young adults in choosing an ideal residence by considering factors such as travel distance, perceived travel time, and subway crowdedness. By utilizing real estate transaction and subway crowdedness data, the platform calculates the perceived time for commuting and recommends the best neighborhoods for users.

**Website**: [Demo Link](http://kdt-ai6-team02.elicecoding.com)  
- **Admin Login**:  
  - Email: admin@admin.com  
  - Password: 1111  
- **User Login**:  
  - Email: user@user.com  
  - Password: 1234  

---

## **Project Purpose** 🎯  
In the current real estate market, many services provide price-related information, but there are few services that consider commuting distances and perceived travel times.  
This project aims to provide a subway-station-based neighborhood recommendation service that takes into account subway crowdedness and perceived travel time, making the residence selection process easier and more accurate for young adults.

---

## **Key Features** 🚀  

### **Main Features**  
1. **Location Recommendation**:  
   - Recommends subway-accessible neighborhoods based on perceived travel time.  
   - Factors include subway crowdedness and real estate price data.  

2. **Perceived Travel Time Calculation**:  
   - Uses Dijkstra's algorithm to calculate perceived travel time based on user-selected filters.  
   - Considers actual travel time, subway transfer time, and crowdedness weights.

3. **Interactive Map**:  
   - Visualizes nearby subway stations, facilities, and recommended areas.  

### **Additional Features**  
- **User Reviews and Favorites**:  
  - Allows users to write reviews, like subway stations, and track favorite areas.  
- **Convenience Facilities**:  
  - Displays nearby facilities (e.g., supermarkets, gyms, etc.).  
- **Admin Dashboard**:  
  - Admins can manage user accounts, reviews, and system parameters.  

---

## **Database Design** 📊  

### **Key Tables**  
1. **User Table**: Stores user profiles, preferences, and favorite stations.  
2. **Station Table**: Contains information on subway stations, including crowdedness and real estate prices.  
3. **Review Table**: Manages user reviews and station ratings.  

### **Entity Relationship Diagram (ERD)**  
![Database ERD](https://example.com/erd-diagram-link)  

---

## **Algorithms** 📐  

### **Dijkstra's Algorithm for Perceived Time**  
- Treats subway stations as nodes and travel times as edges.  
- Filters reachable nodes based on user-selected maximum travel time.  
- Updates perceived time by applying crowdedness and transfer weights.  
  ```javascript
  const perceivedTime = travelTime * crowdednessWeight * transferWeight;
  ```

---

## **API Documentation** 📄  
Explore detailed API specifications in the **[API Spreadsheet](https://docs.google.com/spreadsheets/d/1ClWtcq0ayfmQKbjAQk9e1KyxtVXRy8rUkJ_-awIyw1Y/edit#gid=418297014)**.

---

## **Team Members and Roles** 🤝  

- **Team Leader**: Jeongjin Lee  
- **Frontend Developers**: Jeongjin Lee, Hoyoul Choi, Nayoun Ahn  
- **Backend Developers**: Seung-eun Lee, Jongyeol Jung, Seonghun Kang  

---

## **How to Use** 📖  

1. **Access the Website**: Visit the platform at the provided demo link.  
2. **Enter Your Details**: Input your starting location and desired maximum perceived travel time.  
3. **Receive Recommendations**: View subway stations and neighborhoods that match your preferences.  
4. **Explore Additional Features**:  
   - View nearby facilities and user reviews.  
   - Save and review your favorite locations.  

---

## **Technical Details** 🛠️  

### **Frontend Technologies**  
- **HTML5, CSS3, JavaScript**: For creating a responsive and interactive UI.  
- **React**: For managing complex state and rendering components dynamically.  

### **Backend Technologies**  
- **Node.js (Express)**: To handle server requests and business logic.  
- **MySQL**: As the relational database for storing user and location data.  
- **Prisma**: For efficient database interactions.  

### **APIs Used**  
- **Kakao Social Login API**: Enables secure authentication via Kakao accounts.  
- **Seoul Subway API**: Provides subway station information and travel time data.  

---

## **Commit Guidelines** 💾  

### **Message Structure**  
1. **Title**:  
   - Format: `Type: YYYY-MM-DD Member Name - Summary`  
   - Example: `Feat: 2023-01-31 Jeongjin Lee - Add Login`  
2. **Body**:  
   - A concise description of changes.  

### **Commit Types**  
- **Feat**: Add a new feature or enhance functionality.  
- **Fix**: Fix a bug or error.  
- **Docs**: Update documentation or comments.  
- **Style**: Improve code formatting or styles.  
- **Refactor**: Refactor code without changing its behavior.  
- **Test**: Add or modify tests.  

---

## **Demo Video** 🎥  
[Watch the Demo](https://example.com/demo-video-link)  

---

For more details, feel free to explore the **[API Documentation](https://docs.google.com/spreadsheets/d/1ClWtcq0ayfmQKbjAQk9e1KyxtVXRy8rUkJ_-awIyw1Y/edit)** or contribute to our repository. Feedback is always welcome!
```
