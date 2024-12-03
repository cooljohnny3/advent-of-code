-- local filename = "./example"
local filename = "./input"
local possibleIndexes = {}

for line in io.lines(filename) do
    local colonIndex = string.find(line, ":")
    local gameNumber = string.sub(line, #"Game ", colonIndex-1)
    local gameStatsString = string.sub(line, colonIndex+2)
    print(gameStatsString)
    local index = 1
    local counts = {blue=0, red=0, green=0} 
    while index < #gameStatsString do
        local nextTerminatorIndex = string.find(gameStatsString, '[,;]', index)
        -- print(index, nextTerminatorIndex)
        if nextTerminatorIndex == nil then
            nextTerminatorIndex = #gameStatsString
        end
        local value = string.sub(gameStatsString, index, nextTerminatorIndex)
        -- print(value)
        local spaceIndex = string.find(value, " ")
        local count = string.sub(value, 1, spaceIndex-1);
        local color = string.sub(value, spaceIndex+1)
        if nextTerminatorIndex ~= #gameStatsString then
            color = string.sub(color, 1, #color-1)
        end
        -- print(count, color)
        counts[color] = math.max(counts[color], tonumber(count))
        if nextTerminatorIndex == nil then 
            break;
        end
        index = nextTerminatorIndex + 2
    end
    -- check if the maxes for the game are under the required maxes
    if counts['red'] <= 12 and counts['green'] <= 13 and counts['blue'] <= 14 then
        possibleIndexes[#possibleIndexes+1] = gameNumber
    end
end

local sum = 0
for i,total in pairs(possibleIndexes) do
    sum = sum + total
end
print(sum)