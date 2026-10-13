#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>
#include "time.h"

// --- Config ---
const char* ssid = "Wokwi-GUEST";
const char* password = "";
const char* serverUrl = "http://httpbin.org/post";
const char* ntpServer = "pool.ntp.org";

// --- 20x4 LCD Setup ---
LiquidCrystal_I2C lcd(0x27, 20, 4); 

// --- Keypad Setup ---
const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {13, 12, 14, 27}; 
byte colPins[COLS] = {26, 25, 33, 32};
Keypad customKeypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

const int FINGERPRINT_SIM_BUTTON = 34;
String inputID = "";
bool keypadMode = false;

// Simulated State to toggle between Sign-In and Sign-Out for testing
bool isSigningOutNext = false; 

// Structure to simulate a tiny database look-up inside the code
struct StaffMember {
  String id;
  String name;
};

// Dummy dataset for the simulation
StaffMember staffDatabase[] = {
  {"224587", "Ifeoluwa Tayo"},
  {"1042", "Mr. Adebayo"},
  {"2055", "Mrs. Okafor"}
};
const int staffCount = 3;

// --- Time Helper Functions ---
String getLocalTimeStr() {
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    return "07:30:00 AM"; // Default fallback simulation time if internet lags
  }
  char timeStringBuff[50];
  // Formats time cleanly as HH:MM:SS AM/PM
  strftime(timeStringBuff, sizeof(timeStringBuff), "%I:%M:%S %p", &timeinfo);
  return String(timeStringBuff);
}

int getHour() {
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)) return 7; // Fallback to morning
  return timeinfo.tm_hour;
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  pinMode(FINGERPRINT_SIM_BUTTON, INPUT_PULLUP);

  lcd.init();
  lcd.backlight();
  
  // Clean, professional startup
  lcd.setCursor(0, 0); lcd.print("====================");
  lcd.setCursor(0, 1); lcd.print("   TREASURELAND     ");
  lcd.setCursor(0, 2); lcd.print("  ELEMENTARY OS...  ");
  lcd.setCursor(0, 3); lcd.print("====================");
  delay(2000);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(200); }
  
  configTime(3600, 0, ntpServer); // GMT+1 for Nigeria
  showDashboard();
}

void loop() {
  // Live running clock dashboard update
  static unsigned long lastTimeUpdate = 0;
  if (millis() - lastTimeUpdate > 1000 && !keypadMode) {
    lastTimeUpdate = millis();
    lcd.setCursor(0, 3);
    lcd.print("TIME: " + getLocalTimeStr());
  }

  // Biometric Scan Simulation (Pressing the button)
  if (digitalRead(FINGERPRINT_SIM_BUTTON) == LOW) {
    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("[BIOMETRIC SCANNING]");
    lcd.setCursor(0, 1); lcd.print("Verifying Vector... ");
    delay(1000);
    
    // Simulate finding user "224587" from the biometric module ID match
    processAttendance("224587"); 
    delay(4000);
    showDashboard();
  }

  // Manual Keypad Fallback handling
  char key = customKeypad.getKey();
  if (key) {
    handleKeypadInput(key);
  }
}

void showDashboard() {
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("TREASURELAND ELEM.  ");
  lcd.setCursor(0, 1); lcd.print("--------------------");
  lcd.setCursor(0, 2); lcd.print("Scan Finger / Pin   ");
  lcd.setCursor(0, 3); lcd.print("TIME: " + getLocalTimeStr());
}

void handleKeypadInput(char key) {
  if (key == '#') {
    keypadMode = true;
    inputID = "";
    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("TREASURELAND ELEM.  ");
    lcd.setCursor(0, 1); lcd.print("ENTER STAFF ID NO:  ");
    return;
  }

  if (keypadMode) {
    if (key == '*') { 
      if (inputID.length() > 0) {
        processAttendance(inputID);
      } else {
        lcd.setCursor(0, 2); lcd.print("ERROR: EMPTY FIELD  ");
      }
      delay(4000);
      keypadMode = false;
      showDashboard();
    } 
    else if (key == 'C') {
      inputID = "";
      lcd.setCursor(0, 2); lcd.print("                    ");
    }
    else if (key >= '0' && key <= '9') {
      inputID += key;
      lcd.setCursor(0, 2); lcd.print("ID: " + inputID);
    }
  }
}

void processAttendance(String idNo) {
  // 1. Look up user in database array
  String staffName = "Unknown Staff";
  bool userFound = false;

  for(int i = 0; i < staffCount; i++) {
    if(staffDatabase[i].id == idNo) {
      staffName = staffDatabase[i].name;
      userFound = true;
      break;
    }
  }

  lcd.clear();
  if (!userFound) {
    lcd.setCursor(0, 0); lcd.print("  ACCESS REJECTED   ");
    lcd.setCursor(0, 1); lcd.print("--------------------");
    lcd.setCursor(0, 2); lcd.print("ID: " + idNo);
    lcd.setCursor(0, 3); lcd.print("User Not Enrolled   ");
    return;
  }

  // 2. Intelligently determine if they are signing IN or OUT based on time of day
  // (In a real system, it checks the database logs, but for simulation: morning = IN, afternoon/evening = OUT)
  int currentHour = getHour();
  bool isSigningOut = (currentHour >= 14); // If it's past 2:00 PM, assume they are signing out

  String timeNow = getLocalTimeStr();

  // 3. Display customized, fun messages
  if (!isSigningOut) {
    // SIGN IN RESPONSE
    lcd.setCursor(0, 0); lcd.print("WELCOME! IN: " + timeNow.substring(0,5) + timeNow.substring(8));
    lcd.setCursor(0, 1); lcd.print(staffName);
    lcd.setCursor(0, 2); lcd.print("ID NO: " + idNo);
    
    // Random motivational morning lines
    int r = millis() % 2;
    lcd.setCursor(0, 3);
    if(r == 0) lcd.print("Have a magical day! ");
    else       lcd.print("You inspire them!  ");

  } else {
    // SIGN OUT RESPONSE
    lcd.setCursor(0, 0); lcd.print("GOODBYE! OUT:" + timeNow.substring(0,5) + timeNow.substring(8));
    lcd.setCursor(0, 1); lcd.print(staffName);
    lcd.setCursor(0, 2); lcd.print("ID NO: " + idNo);
    
    // The specific fun goodbye phrase you requested
    lcd.setCursor(0, 3);
    lcd.print("Sleep early for kids"); // Fits perfectly on line 4 (20 character limit)
  }

  // Send record payload data off to backend API over Wi-Fi network in the background
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverUrl);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String actionType = isSigningOut ? "SIGN_OUT" : "SIGN_IN";
  http.POST("id=" + idNo + "&action=" + actionType);
  http.end();
}