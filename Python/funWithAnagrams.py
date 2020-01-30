def sortString(string):
	return ''.join(map(str, sorted(string)))

def funWithAnagrams(text):
    result = dict()
    for i in range(len(text)):
        sortedWord = sortString(text[i])
        if(sortedWord not in result)
            result[x] = text[i]
    return sorted(list(result.values()))