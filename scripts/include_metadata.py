from pandocfilters import toJSONFilter, Str
import sys

def myfilter(key, value, format, meta):
    if myfilter.firsttime:
        for k, v in meta.items():
            print(k, v, file=sys.stderr)
        # print(key, file=sys.stderr)
        # print(value, file=sys.stderr)
        # print(meta, file=sys.stderr)
        myfilter.firsttime = False
myfilter.firsttime = True

if __name__=='__main__':
    toJSONFilter(myfilter)