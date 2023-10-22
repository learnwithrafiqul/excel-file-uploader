import pandas as pd


def read_data(file):
    df = pd.read_excel(file, sheet_name='Sheet1', engine='openpyxl')
    header = df.columns
    data_list = []
    for index, row in df.iterrows():
        data_dict = {}
        for head in header:
            data_dict[head] = row[head]
        data_list.append(data_dict)
    return data_list


if __name__ == '__main__':
    read_data()
