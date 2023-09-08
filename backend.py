import fastapi
from fastapi.middleware.cors import CORSMiddleware
import json
import geometrydash

app = fastapi.FastAPI()

origins = ['*']

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

@app.get('/')
async def root():
    return 'Docs are at https://cornboar.com/api/.'

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
    with open(r'C:\Users\Dani1\DLVGDSTATS.json', 'r+') as f:
        dlv_gd_stats = json.load(f)
    with open(r'C:\Users\Dani1\DLVPOINTS.json', 'r+') as f:
        dlv_points = json.load(f)
    dlv_list_points = {}
    if not all([True if i in list(dlv_gd_stats.keys()) else False for i in dlv_list['main']]):
        for i in dlv_list['main']:
            level = await geometrydash.search_level(i, 1)
            level = level[0]
            if level.author is None:
                class author:
                    def __init__(self):
                        self.name = '-'
                level.author = author()
            dlv_gd_stats[i] = {'author': level.author.name, 'difficulty': level.difficulty, 'downloads': level.downloads, 'likes': level.likes, 'length': level.length, 'objectCount': level.objects, 'gameVersion': level.gameVersion,
                               'song': level.songName,
                               'levelId': str(level.id)}
            dlv_list_points[i] = dlv_points[i.lower()]
            open(r'C:\Users\Dani1\DLVGDSTATS.json', 'r+').truncate()
            json.dump(dlv_gd_stats, open(r'C:\Users\Dani1\DLVGDSTATS.json', 'r+'))
    dlv_list['gd_stats'] = dlv_gd_stats
    dlv_list['points'] = dlv_list_points
    return dlv_list

@app.get('/dlvusers/')
async def get_dlv_users():
    with open(r'C:\Users\Dani1\DLVUSERS.json', 'r+') as f:
        dlv_users = json.load(f)
    with open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+') as f:
        dlv_saves = json.load(f)
    for i in dlv_users:
        xp = dlv_saves[i]['xp']
        dlv_users[i].update({'xp': xp})
    sorted_dlv_users = {x[0]: x[1] for x in sorted(dlv_users.items(), key=lambda x: x[1]['xp'], reverse=True)}
    return sorted_dlv_users

@app.get('/dlvusers/{user_id}/')
async def get_dlv_user(user_id):
    with open(r'C:\Users\Dani1\DLVusers.json', 'r+') as f:
        dlv_users = json.load(f)
    return dlv_users[str(user_id)]

@app.get('/dlvuserstop100/')
async def get_dlv_users_top100():
    with open(r'C:\Users\Dani1\DLVBOTXPSAVES.json', 'r+') as f:
        dlv_saves = json.load(f)
    sorted_saves = list(sorted(dlv_saves.items(), key=lambda x: x[1]['xp'], reverse=True))
    return {'main': sorted_saves[:99]}

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
