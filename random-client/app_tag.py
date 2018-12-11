import requests
import datetime
import random

def r(n):
    return random.randint(0,n)


def generate_random_family():
    first_names = ['amichai', 'lior', 'tal', 'yair', 'yossi', 'moti', 'dani', 'matt', 'jessica', 'hani']
    last_names  = ['dagan', 'mantinband', 'cohen', 'levi']
    about       = ['hey! im 23 years old..', 'hello everyone! i like..', 'hello guys!..']
    location    = ['kiryat shmona', 'efrat', 'jerusalem', 'dafna', 'haifa', 'rosh-pina', 'garden']

    return {  'name'              : first_names[r(first_names.__len__()-1)] + ' ' + last_names[r(last_names.__len__()-1)],
              'profile_photo_url' : 'https://google.com',
              'about'             : about[r(about.__len__()-1)],
              'location'          : location[r(location.__len__()-1)] }


def get_seconds_in_week():
    return 60*60*24*7


def generate_random_time_date():
    today            = datetime.datetime.today()
    random_date      = today + datetime.timedelta(seconds=random.randrange(get_seconds_in_week()))
    return random_date.strftime("%Y-%m-%d %H:%M")

def generate_random_meal():
    names        = ['shabbat meal!', 'the guys', 'friday night with the girls', 'girls meal!', 'friday with the mantinbands', '']
    descriptions = ['just our regular kind of meal', 'time to feast!', 'food like never before', 'some good vegan food']
    kosher       = ['badatzh', 'not-kosher', 'rabanut', 'lemehadrin']
    restrictions = ['none', 'none', 'none', 'vegan', 'vegetarain', 'gluten-free']
    allergies    = ['none', 'none', 'none', 'none', 'none', 'none', 'peanuts', 'milk', 'soy', 'tree-nuts']
    accessible   = ['none', 'none', 'none', 'stairs', 'elevator', 'ground-level']

    return {  'id_creator'           : r(8),
              'name'                 : names[r(names.__len__()-1)],
              'description'          : descriptions[r(descriptions.__len__()-1)],
              'total_guests'         : r(20),
              'current_guests'       : 0,
              'time'                 : generate_random_time_date(),
              'lat'                  : round(random.uniform(-90,90), 10),
              'lng'                  : round(random.uniform(-180,180), 11),
              'kosher'               : kosher[r(kosher.__len__()-1)],
              'restrictions'         : restrictions[r(restrictions.__len__()-1)],
              'allergies'            : allergies[r(allergies.__len__()-1)],
              'kids_friendly'        : random.randint(0, 1),
              'dog_friendly'         : random.randint(0, 1),
              'accessible'           : accessible[r(accessible.__len__()-1)],
              'background_image_url' : 'https://google.com'  }




#print(generate_random_meal())
#r = requests.post("https:/foo.com/api/family/add", data=generate_random_family());
r = requests.post("https:/foo.com/api/meals/add", data=generate_random_meal());
print(r.text)
