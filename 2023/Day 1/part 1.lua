local lines = {}
-- local filename = "./example.txt"
local filename = "./input"

local ans = {}
local i = 1
for line in io.lines(filename) do
    for c in line:gmatch"." do
        if tonumber(c) then 
            if(ans[i]) then
                if(#ans[i] == 2) then
                    ans[i] = string.sub(ans[i],1,1)..c
                else
                    ans[i] = ans[i]..c
                end
            else
                ans[i] = c
            end
            print(ans[i])
        end
    end
    if (#ans[i] < 2) then
        ans[i] = ans[i]..ans[i]
    end
    i = i + 1
end

local sum = 0
-- local file = io.open('./out.txt', 'w')
-- io.output(file)
for i,item in pairs(ans) do
    print(item)
    -- io.write(item,'\n')
    local number = tonumber(item)
    sum = sum + number 
end
io.close()
print(sum)
