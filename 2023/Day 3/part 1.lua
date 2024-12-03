local lines = {}
local filename = "./example"
-- local filename = "./input"
-- local filename = "./input 2"

for line in io.lines(filename) do
    lines[#lines+1] = line
end

function parsePartNumber(line, index)
    if line == nil then
        return 0
    end
    if tonumber(string.sub(line, index, index)) == nil then
        return 0
    end
    -- walk left until reach end of line or not number 
    local currentIndex = index
    while currentIndex > 0 do
        local number = tonumber(string.sub(line, currentIndex, currentIndex))
        if number == nil then
            break;
        end
        -- print(number)
        currentIndex = currentIndex - 1
    end
    if currentIndex == index then
        return 0
    end
    currentIndex = currentIndex + 1
    -- find next symbol
    local nextSymbolIndex = string.find(line, "[^%d]", currentIndex)
    if nextSymbolIndex == nil then
        nextSymbolIndex = #line
    end
    local numberString = string.sub(line, currentIndex, nextSymbolIndex-1)
    -- print(currentIndex, nextSymbolIndex)
    -- print(numberString)
    return tonumber(numberString)
end

local numbers = {}
for i,line in pairs(lines) do
    local stringIndex = 1
    while true do
        local symbolIndex = string.find(line, "[^%d.]", stringIndex)
        if symbolIndex == nil then
            break;
        end
        -- print("Found symbol "..string.sub(line, symbolIndex, symbolIndex), "line: "..i) 
        -- left
        numbers[parsePartNumber(line, symbolIndex-1)] = 0
        -- top-left
        numbers[parsePartNumber(lines[i-1], symbolIndex-1)] = 0
        -- top
        numbers[parsePartNumber(lines[i-1], symbolIndex)] = 0
        -- top-right
        numbers[parsePartNumber(lines[i-1], symbolIndex+1)] = 0
        -- right
        numbers[parsePartNumber(line, symbolIndex+1)] = 0
        -- bottom-right
        numbers[parsePartNumber(lines[i+1], symbolIndex+1)] = 0
        -- bottom
        numbers[parsePartNumber(lines[i+1], symbolIndex)] = 0
        -- bottom-left
        numbers[parsePartNumber(lines[i+1], symbolIndex-1)] = 0
        stringIndex = symbolIndex+1
    end
end

local sum = 0
for number,_ in pairs(numbers) do
    print(number)
    sum = sum + number
end
print(sum)

