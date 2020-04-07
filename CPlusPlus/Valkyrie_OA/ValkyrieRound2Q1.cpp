/******************************************************************************

Complete implementation of SecurityLookup class defined below.

This class maintains Security objects and provides methods for their lookup
via Security attributes.

	• Every Security object has a unique id (id_)
	• Every Security object has a unique symbol (symbol_)
	• Every Security object has a (potentially non-unique) channel id (channel_)

You are responsible for implementing the following methods:

	Security GetSecurity(int id) const

		Return Security object with given id or default (invalid) Security object if not found

	Security GetSecurity(const std::string& symbol) const

		Return Security object with given symbol or default (invalid) Security object if not found

	Securities GetSecurities(int channel) const

		Returns all Security objects with given channel value
		or an empity List of Security objects, if not matching securities are found

	void SaveSecurity(const Security& sec)

		Add a Security object to the lookup instance

		If a Security with a given id already exists:
			• Update Security with new channel id

				Before state:
					Security: 1, "MSFT", 1
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

				Mutations:
					Save Security: 1, "MSFT, 2

				After state:
					Security: 1, "MSFT", 2
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

			• Update Security with new symbol

				Before state:
					Security: 1, "MSFT", 1
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

				Mutations:
					Save Security: 1, "AAPL", 1

				After state:
					Security: 1, "AAPL", 1
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

			• Throw std::runtime_error if symbol is being used by an another Security

				Before state:
					Security: 1, "MSFT", 1
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

				Mutations:
					Save Security 1, "GOOG", 1
					<<< Exception! >>>

				After state:
					Security: 1, "MSFT", 1
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

			• Do not throw std::runtime_error if symbol is in use by the same Security (NOOP)

				Before state:
					Security: 1, "MSFT", 1
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

				Mutations:
					Save Security 1, "MSFT", 1

				After state:
					Security: 1, "MSFT", 1
					Security: 2, "TSLA", 1
					Security: 3, "GOOG", 1

		If a Security with a given id does not exist:
			• Save new Security

				Before state:
					Security: 1, "MSFT", 1

				Mutations:
					Save Security: 2, "TSLA", 2

				After state:
					Security: 1, "MSFT", 1
					Security: 2, "TSLA", 2


The expected number of Security objects within this Lookup is on the order of
10s of millions.  The choice of underlying data structures must ensure
efficient lookups.

Note:
	 - Feel free to use a text editor or IDE of your choice to do this instead.
	 - If you do, simply just copy-paste your code here when you're done.
	 - You are free to add any supporting helper functions, data types, or
	   structures you wish.
	 - You may make use of STL data structures and algorithms
	 - main function has been provided to make code run inside Rextester Web
	   IDE. It is not required to be part of the submission and will not be
	   graded.

******************************************************************************/

#include<iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <map>
#include <set>
#include <stdexcept>

struct Security
{
	uint32_t id_;
	std::string symbol_;
	uint16_t channel_;

	Security()
		: id_{ 0 }
		, channel_{ 0 }
	{}

	Security(uint32_t id, std::string symbol, uint16_t channelId)
		: id_(id)
		, symbol_(symbol)
		, channel_(channelId)
	{}

	bool IsValid() const { return id_ != 0; }
};

using Securities = std::vector<Security>;

class SecurityLookup
{
public:
	Security GetSecurity(int id) const
	{
		// TODO
		uint32_t id_ = id;
		auto idIter = idSymbol.find(id_);
		if (idIter == idSymbol.end()) {
			//id not found
			return Security();
		}else{
			//id found
			return securityList.find(idIter->second)->second;

		}
	}

	Security GetSecurity(const std::string& symbol) const
	{
		// TODO
		auto symIter = securityList.find(symbol);
		if (symIter == securityList.end()) {
			//symbol not found
			return Security();
		}else {
			//symbol found
			return symIter->second;
		}
		
	}

	Securities GetSecurities(int channel) const
	{
		// TODO
		auto channelIter = channelSecurities.find(channel);
		if (channelIter == channelSecurities.end()) {
			//channel not found
			return Securities();
		}else{
			return channelIter->second;
		}
		
	}

	void SaveSecurity(const Security& sec)
	{
		// TODO
		uint32_t id = sec.id_;
		std::string sym = sec.symbol_;
		uint16_t channel = sec.channel_;
		//Check if id exists or not
		if (idSymbol.find(id) == idSymbol.end()) {
			//id not found
			auto symIter = securityList.find(sym);
			if (symIter == securityList.end()) {
				//symbol not found
				addSecurityToChannel(channel, sec);
				idSymbol.insert({ id, sym });
				securityList.insert({ sym, sec });
			}else{
				//symbol found
				throw std::runtime_error("symbol is associated with different id");
			}
		}else {
			//id found
			auto iter = idSymbol.find(id);
			std::string symb = iter->second;
			auto symIter = securityList.find(sym);
			if (symIter == securityList.end()) {
				//symbol not found
				addSecurityToChannel(channel, sec);
				//Remove the id from map and then insert it with new value
				idSymbol.erase(id);
				idSymbol.insert({ id, sym });
				securityList.insert({ sym, sec });
				securityList.erase(symb);
			}else {
				//Symbol found, check if the id is same or not
				if (symIter->second.id_ == id) {
					//symbol belongs to same id, therefore update the channel
					if (channel != symIter->second.channel_) {
						//Remove sym from map and then insert sym with new sec object 
						securityList.erase(sym);
						securityList.insert({ sym, sec });
						addSecurityToChannel(channel, sec);
					}
				}else {
					//Throw an error because symbol is associated with different id
					throw std::runtime_error("symbol is associated with different id");
				}
			}
		}


	}

private:
	// TODO add necessary data structures
	std::unordered_map<uint32_t, std::string> idSymbol;
	std::unordered_map<std::string, Security> securityList;
	std::unordered_map<uint16_t, std::vector<Security>> channelSecurities;

	void addSecurityToChannel(uint16_t channel, const Security& sec){
		auto channelIter = channelSecurities.find(channel);
		if (channelIter == channelSecurities.end()) {
			//channel not found
			std::vector<Security> temp;
			temp.push_back(sec);
			channelSecurities.insert({ channel, temp });
		}
		else {
			//channel found
			channelIter->second.push_back(sec);
		}
	}
};

int test_main()
{
	SecurityLookup lookup;
	uint32_t i = 1;
	uint16_t j = 1;
	Security sec(i, "MSFT", j);
	lookup.SaveSecurity(sec);
	//lookup.GetSecurity(i);
	//lookup.GetSecurity("MSFT");

	uint32_t a = 2;
	uint16_t b = 1;
	Security sec2(a, "TSLA", b);
	uint32_t c = 3;
	uint16_t d = 1;
	Security sec3(c, "GOOG", d);
	lookup.SaveSecurity(sec2);
	lookup.SaveSecurity(sec3);
	std::cout << lookup.GetSecurity(1).symbol_;
	uint16_t k = 2;
	Security sec4(i, "AAPL", 2);
	lookup.SaveSecurity(sec4);
	std::cout << lookup.GetSecurity(1).symbol_;
	return -1;
}
