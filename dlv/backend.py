import fastapi
from fastapi.middleware.cors import CORSMiddleware
import json
import random
import string
import requests
import secrets
from discord_webhook import DiscordWebhook, DiscordEmbed

aredl_data_full = requests.get('https://api.aredl.net/api/aredl/levels/').json()
new_aredl_data_full = {}
for i in aredl_data_full:
    try:
        if not i['legacy'] is True:
            new_aredl_data_full[i['name'].lower()] = i
    except:
        new_aredl_data_full[i['name'].lower()] = i
aredl_data_full = new_aredl_data_full
aredl_all_demons = []
for i in list(aredl_data_full.keys()):
    aredl_all_demons.append(i.lower())

app = fastapi.FastAPI()

origins = ['*']

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

@app.get('/')
async def root():
    return 'Docs are at https://cornboar.com/apidocs/.'

@app.get('/stand/{user_id}/')
async def get_stand(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTSTANDSAVES.json', 'r+') as f:
        standSaveData = json.load(f)
    return {str(user_id): standSaveData[user_id]}

@app.get('/stands/{user_id}/')
async def get_stands(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTSTANDSAVES.json', 'r+') as f:
        standSaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT1SAVES.json', 'r+') as f:
        slot1SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT2SAVES.json', 'r+') as f:
        slot2SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT3SAVES.json', 'r+') as f:
        slot3SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT4SAVES.json', 'r+') as f:
        slot4SaveData = json.load(f)
    with open(r'C:\Users\Dani1\Documents\YBABOTSLOT5SAVES.json', 'r+') as f:
        slot5SaveData = json.load(f)
    # ignore this awful garbage 😭
    return {'equipped': standSaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>', ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_1': slot1SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>', ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>',
    'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_2': slot2SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_3': slot3SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_4': slot4SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L'), 'slot_5': slot5SaveData[user_id].replace('<:Halloween2022:1082077319566479380>', ', H22').replace('<:Halloween2021:1082077268773437571>',
    ', H21').replace('<:Christmas2022:1082055926271459348>',
    ', C22').replace('<:Christmas2021:1082056187622735942>', ', C21').replace('<:Limited:1082077133054165203>', ', L').replace('<:Common:1082076720401760327>', 'C').replace('<:Uncommon:1082076907207655514>',
    'U').replace('<:Epic:1082076967270109325>', 'E').replace('<:Legendary:1082077050841604126>', 'L')}

@app.get('/items/{user_id}/')
async def get_items(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTITEMINVENTORYSAVES.json', 'r+') as f:
        itemInventorySaveData = json.load(f)
    return {'Mysterious Arrow': itemInventorySaveData[user_id]['Mysterious Arrow'], 'Rokakaka': itemInventorySaveData[user_id]['Rokakaka'], "Rib Cage of the Saint's Corpse": itemInventorySaveData[user_id]["Rib Cage of the Saint's Corpse"],
            'Lucky Arrow': itemInventorySaveData[user_id]['Lucky Arrow']}

@app.get('/pity/{user_id}/')
async def get_pity(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTPITYSAVES.json', 'r+') as f:
        pitySaveData = json.load(f)
    return {str(user_id): pitySaveData[user_id]}

@app.get('/username/{user_id}/')
async def get_username(user_id):
    with open(r'C:\Users\Dani1\Documents\YBABOTUSERINFOSAVES.json', 'r+') as f:
        userInfoSaveData = json.load(f)
    return {str(user_id): userInfoSaveData[user_id] if not userInfoSaveData[user_id].endswith('0') else userInfoSaveData[user_id][:-2]}

@app.get('/is_admin/{user_id}/')
async def get_admin_status(user_id):
    return {str(user_id): True if str(user_id) in ['991443322516279466', '707502360783487007', '933413272672170054', '738726638539505694', '980510041864040548'] else False}

@app.get('/dlvlist/')
async def get_dlv_list():
    with open(r'C:\Users\Dani1\DLVLIST.json', 'r+') as f:
        dlv_list = json.load(f)
    return dlv_list

@app.get('/dlvusers/')
async def get_dlv_users():
    with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
        dlv_users = json.load(f)
    sorted_users = list(sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True))
    sorted_users = {x[0]: x[1] for x in sorted_users}
    return sorted_users

@app.get('/dlvpacks/')
async def get_dlv_users():
    with open(r'C:\Users\Dani1\DLVPACKS.json', 'r+') as f:
        dlv_packs = json.load(f)
    sorted_packs = list(sorted(dlv_packs.items(), key=lambda x: x[1]['xp_value'], reverse=True))
    sorted_packs = {x[0]: x[1] for x in sorted_packs}
    return sorted_packs

@app.get('/dlvvalidatekey/{key}/')
async def dlv_validate_key(key):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        return {'main': True}
    else:
        return {'main': False}

@app.get('/dlvadddemon/{key}/{position}/{name}/{color}/')
async def dlv_add_demon(key, position, name, color):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)  # )))
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVLIST.json', 'r+') as f:
                dlv_list = json.load(f)
            dlv_list['main'].insert(len(dlv_list['main']) - (int(position) - 1), name.title())
            dlv_list['colors'][name.title()] = f'#{color}'
            open(r'C:\Users\Dani1\DLVLIST.json', 'r+').truncate()
            json.dump(dlv_list, open(r'C:\Users\Dani1\DLVLIST.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvremovedemon/{key}/{name}/')
async def dlv_remove_demon(key, name):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        name = name.title()
        try:
            with open(r'C:\Users\Dani1\DLVLIST.json', 'r+') as f:
                dlv_list = json.load(f)
            new_list = []
            for i in dlv_list['main']:
                if i != name:
                    new_list.append(i)
            dlv_list['main'] = new_list
            open(r'C:\Users\Dani1\DLVLIST.json', 'r+').truncate()
            json.dump(dlv_list, open(r'C:\Users\Dani1\DLVLIST.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvaddcompletion/{key}/{user_id}/{demon_name}/')
async def dlv_add_completion(key, user_id, demon_name):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
                dlv_users = json.load(f)
            dlv_users[user_id]['completions'].append(demon_name)
            open(r'C:\Users\Dani1\DLVUSERS.json', 'r+').truncate()
            json.dump(dlv_users, open(r'C:\Users\Dani1\DLVUSERS.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvremovecompletion/{key}/{user_id}/{demon_name}/')
async def dlv_remove_completion(key, user_id, demon_name):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
                dlv_users = json.load(f)
            dlv_users[user_id]['completions'].remove(demon_name)
            open(r'C:\Users\Dani1\DLVUSERS.json', 'r+').truncate()
            json.dump(dlv_users, open(r'C:\Users\Dani1\DLVUSERS.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvsetxp/{key}/{user_id}/{xp_amount}/')
async def dlv_remove_completion(key, user_id, xp_amount):
    with open(r'C:\Users\Dani1\DLVKEYS.json', 'r+') as f:
        dlv_keys = json.load(f)
    if key == dlv_keys['main']:
        try:
            with open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+') as f:
                dlv_bot_xp_saves = json.load(f)
            dlv_bot_xp_saves[user_id]['xp'] = int(xp_amount)
            open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+').truncate()
            json.dump(dlv_bot_xp_saves, open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+'))
            return {'main': 'success'}
        except Exception as error:
            return {'main': error}
    else:
        return {'main': 'invalid key'}

@app.get('/dlvvalidateloginkey/{login_key}/')
async def dlv_validate_login_key(login_key):
    try:
        with open(r'C:\Users\Dani1\DLVLOGINKEYS.json', 'r') as f:
            dlv_login_keys = json.load(f)
        if not len(login_key) > 9:
            return {'main': f'Invalid Login Key!'}
        if not login_key.__contains__('E'):
            return {'main': 'Invalid Login Key!'}
        if login_key.split('E')[0] not in list(dlv_login_keys.keys()):
            print(login_key.split('E')[0])
            return {'main': 'Invalid Login Key!'}
        if login_key != dlv_login_keys[login_key.split('E')[0]]:
            return {'main': 'Invalid Login Key!'}
        else:
            return {'main': 'Success!', 'user_id': login_key.split('E')[0]}
    except Exception as error:
        print(error)
        return {'main': 'An Error Occured'}

@app.get('/dlvsubmitrecord/{login_key}/{demon}/{proof_link}/{additional_notes}/')
async def get_admin_status(login_key, demon, proof_link, additional_notes):
    with open(r'C:\Users\Dani1\DLVRECORDSAVES.json', 'r+') as f:
        dlv_records = json.load(f)
    with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
        dlv_users = json.load(f)
    check_login_key = await dlv_validate_login_key(login_key)
    if check_login_key['main'] == 'Success!':
        if demon.lower() in aredl_all_demons:
            deny = False
            for i in list(dlv_records.values()):
                if i['user_id'] == check_login_key['user_id'] and i['demon'] == demon.lower() and i['status'] != 'rejected':
                    deny = True
                    break
            if not demon.lower() in dlv_users[check_login_key['user_id']]['completions']['main'] and not deny:
                record_id = ''
                while True:
                    for i in range(10):
                        record_id += random.choice(string.ascii_letters + '12345678910')
                    if record_id not in list(dlv_records.keys()):
                        break
                dlv_records[record_id] = {'record_id': record_id, 'user_id': check_login_key['user_id'], 'username': dlv_users[check_login_key['user_id']]['username'],
                                          'demon': demon.lower(), 'proof_link': proof_link, 'additional_notes': additional_notes, 'status': 'pending', 'reject_reason': None}
                open(r'C:\Users\Dani1\DLVRECORDSAVES.json', 'r+').truncate()
                json.dump(dlv_records, open(r'C:\Users\Dani1\DLVRECORDSAVES.json', 'r+'))
                webhook = DiscordWebhook(url=secrets.WEBHOOK_URL)
                webhook.add_embed(DiscordEmbed(title=f'Record Submitted By {dlv_users[check_login_key["user_id"]]["username"]} ({check_login_key["user_id"]}) For {aredl_data_full[demon]["name"]} ({aredl_data_full[demon]["level_id"]})',
                                               description=f'Proof Link: {proof_link}\nAdditional Notes: {additional_notes}\nRecord ID: {record_id}', color='000000'))
                webhook.execute()
                return {'main': 'Success!'}
            else:
                return {'main': 'You Have Already Completed/Submitted This Demon!'}
        else:
            return {'main': 'Invalid Demon Name!'}
    else:
        return {'main': 'Invalid Login Key!'}
